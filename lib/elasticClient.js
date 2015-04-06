'use strict';
var Promise = require('bluebird');
var http = require('q-io/http');
var _ = require('lodash');

var TTL_IN_MIN = 60;

function ElasticClient(port, server, logger) {
  //TODO: Remove this garbage and implement something decent for logging.
  if (!logger.info) this.logger.info = function(){};
  if (!logger.debug) this.logger.debug = function(){};
  if (!logger.profile) this.logger.profile = function(){};
  if (!logger.error) this.logger.error = function(){};

    /**
   * Sends a query to elasticsearch _search endpoint for given index and type.
   * @param  {string} index       Elasticsearch index used.
   * @param  {string} type        Elasticsearch type to query.
   * @param  {string} body        Elasticsearch query body. String-form JSON.
   * @param  {string} queryString Querystring to append to _search. Include the '?'.
   * @return {Promise(object)}    Parsed JSON response from elastic.
   */
  function executeSearch(index, type, body, queryString) {
    var path = index + '/' + type + '/_search' + (queryString || '');
    return Promise.resolve(httpPost(path, body))
      .then(parseElasticResponse);
  }

  /**
   * Sends a count query to elasticsearch _search endpoint for given index and type.
   * Automatically appends ?search_type=count.
   * *** Will include any aggs that are part of the query. ***
   * @param  {string} index       Elasticsearch index used.
   * @param  {string} type        Elasticsearch type to query.
   * @param  {string} body        Elasticsearch query body. String-form JSON.
   * @return {Promise(object)}    Parsed JSON response from elastic.
   */
  function executeCount(index, type, body) {
    return executeSearch(index, type, body, '?search_type=count');
  }

  /**
   * Sends a query to elasticsearch _search endpoint for given index and type.
   * Automatically appends ?scroll=1m&search_type=scan unless noScan is set.
   *
   * *** Will include any aggs that are part of the query. ***
   * @param  {string} index       Elasticsearch index used.
   * @param  {string} type        Elasticsearch type to query.
   * @param  {string} body        Elasticsearch query body. String-form JSON.
   * @param  {int} ttlInMin   Time for scroll to live between requests in minutes.
   * @param  {boolean} noScan     If true, don't use scan. Defaults to false.
   * @return {Promise(object)}    Parsed JSON response from elastic. -Includes _scroll_id for pageScroll calls.
   */
  function executeScroll(index, type, body, ttlInMin, noScan) {
    TTL_IN_MIN = ttlInMin || TTL_IN_MIN;
    var ttlString = TTL_IN_MIN + 'm';
    var queryString = '?scroll=' + ttlString; //TODO: make time configurable
    if (!noScan) {
      queryString = queryString + '&search_type=scan';
    }
    logger.info('ttlInMin', TTL_IN_MIN);
    logger.info('queryString', queryString);
    return executeSearch(index, type, body, queryString);
  }

  /**
   * Wraps scroll/scan methods.
   *
   * *** Will include any aggs that are part of the query. ***
   * @param  {string} index       Elasticsearch index used.
   * @param  {string} type        Elasticsearch type to query.
   * @param  {string} body        Elasticsearch query body. String-form JSON.
   * @param  {int} ttlInMin       Time for scroll to live between requests in minutes.
   * @param  {boolean} noScan     If true, don't use scan. Defaults to false.
   * @return {Promise(object)}    Parsed JSON response from elastic. -Includes _scroll_id for pageScroll calls.
   */
  function scrollToEnd (index, type, body, ttlInMin, noScan) {
    var recurseScroll = _.curry(scroll)([]);
    return executeScroll(index, type, body, ttlInMin, noScan)
      .then(parseScrollId)
      .then(pageScroll)
      .then(recurseScroll);
  }

  /**
   * Gets the scroll results for the provided scrollId
   *
   * *** Will include any aggs that are part of the query. ***
   * @param  {string} scrollId    Elasticsearch scroll_id to get the next page for.
   * @return {Promise(object)}    Parsed JSON response from elastic. -Includes _scroll_id for pageScroll calls.
   */
  function pageScroll(scrollId, rawData){
    var path = '/_search/scroll?scroll=' + TTL_IN_MIN + 'm&scroll_id=' + (scrollId || '');
    var parse = rawData ? readRawBytes : parseElasticResponse;
    profileScroll();
    return Promise.resolve(httpGet(path))
      .then(parse)
      .tap(profileScroll);

    function profileScroll(){
      logger.profile('scroll ...' + scrollId.substr(scrollId.length-5, 5));
    }
  }


  /**
   * Private - Not exported below this line.
   */

  function parseScrollId(res) {
    if (!res._scroll_id) {
      throw new Error('no scroll id on scroll response.');
    }
    return res._scroll_id;
  }

  function scroll(results, res){
    results = results.concat(res.hits.hits);
    var curriedScroll = _.curry(scroll)(results);
    if (results.length < res.hits.total) {
      if (res.hits.hits.length === 0){
        throw new Error('Scroll request timed out');
      }
      return pageScroll(parseScrollId(res))
        .then(curriedScroll);
    }
    else {
      return results;
    }

  }

  function httpGet(path) {
    logger.debug('Executing elastic get route: ...[%s]', path.substr(path.length-5, 5));
    return http.request({
      host: server,
      port: port,
      path: path,
      method: 'GET'
    });
  }


  function httpPost(path, body) {
    logger.debug('Executing elastic query route: [%s] body: %s', path, body);
    return http.request({
      host: server,
      port: port,
      path: path,
      method: 'POST',
      body: [body]
    });
  }

  function parseElasticResponse(response) {
    return response.body.read()
    .then(function(body) {
      //NOTE: eval is only used here because we trust the source (Elasticsearch)
      var resp = eval('(' + body.toString('utf-8') + ')'); // jshint ignore:line

      if (resp.error) {
        logger.error(resp.error);
        throw new Error('Error during elastic query: ' + resp.error);
      }

      logger.info('Elastic query returned in ' + resp.took + ' ms');
      return resp;
    });
  }

  function readRawBytes(response) {
    return response.body.read()
    .then(function(response) {
      return response.toString();
    });
  }

  return {
    executeSearch: executeSearch,
    executeCount: executeCount,
    executeScroll: executeScroll,
    pageScroll: pageScroll,
    scrollToEnd: scrollToEnd
  };

}

module.exports = ElasticClient;

