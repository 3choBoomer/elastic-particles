'use strict';
function ElasticQuery() {
  this._filter = null;
  this._query = undefined;
  this._disableTermCaching = false;

  this._size = undefined;
  this._source = undefined;
}
module.exports = ElasticQuery;

ElasticQuery.prototype._ensureAggs = function ensureAggs() {
  if (typeof this._aggs === 'undefined') {
    this._aggs = {};
  }
};

/**
 * Sets the query to an instance of an Elastic query.
 * @param {Filter} query instance of ./elasticsearch/queries query.
 */
ElasticQuery.prototype.setQuery = function setQuery(query) {
  this._query = query;
  return this;
};

/**
 * Sets the query filter to an instance of an Elastic Filter.
 * @param {Filter} filter instance of ./elasticsearch/filters filter.
 */
ElasticQuery.prototype.setFilter = function setFilter(filter) {
  this._filter = filter;
  return this;
};

ElasticQuery.prototype.setSize = function setSize(size) {
  this._size = size;
  return this;
};

/**
 * Sets the sort to the specified field name (also supports _doc for natural sort).
 */
ElasticQuery.prototype.setSort = function setSort(field) {
  this._sort = field;
  return this;
};

/**
 * Tells which source fields to include.
 * @param {Array} includes Fields to include in source. Set to false instead of array to not pass _source.
 */
ElasticQuery.prototype.setIncludeFields = function setIncludeFields(includes) {
  if (!this._source) {
    this._source = {};
  }
  if (typeof includes === 'boolean')
    this._source = includes;
  else
    this._source.include = includes;

  return this;
};

ElasticQuery.prototype.setExcludeFields = function setExcludeFields(excludes) {
  if (!this._source) {
    this._source = {};
  }

  this._source.exclude = excludes;
  return this;
};

/**
 * Adds an Elasticsearch Aggregation object to the query.
 * @param {Aggregation} aggObject Instance of Aggregation object.
 * @param {string}      @optional aggName   Name of aggregation.
 */
ElasticQuery.prototype.addAggregation = function addAggregation(aggObject, aggName) {

  aggName = aggName || aggObject.getName();

  if (typeof aggName !== 'string') {
    throw new Error('Aggregation must be named with a string.');
  }

  if (typeof this._aggs === 'undefined') {
    this._aggs = {};
  }

  this._aggs[aggName] = aggObject;

  return this;
};

/**
 * Sets _cache = false on all term and terms filter params
 * Only applied during serialization.
 * @deprecated See https://www.elastic.co/guide/en/elasticsearch/reference/2.x/breaking_20_query_dsl_changes.html#_filter_auto_caching
 */
ElasticQuery.prototype.disableTermCaching = function disableTermCaching() {
  throw new Error('the _cache option has been deprecated. See https://www.elastic.co/guide/en/elasticsearch/reference/2.x/breaking_20_query_dsl_changes.html#_filter_auto_caching');
};

ElasticQuery.prototype.serialize = function serializeQuery() {
  var q = {};

  if (this._sort) {
    q.sort = this._sort;
  }
  if (this._size) {
    q.size = this._size;
  }
  if (this._aggs) {
    q.aggs = this._aggs;
  }


  // TODO: Implement filtered query.
  // Currently creates a filtered query if a filter is set.
  if (this._filter) {
    q.query = { 'filtered': { 'filter': this._filter }};
  }

  if (this._query && this._filter) {
    q.query.filtered.query = this._query;
  } else if (this._query) {
    q.query = this._query;
  }

  if (this._source || typeof this._source === 'boolean') {
    q._source = this._source;
  }

  //TODO: Better serialization (without unnecessary whitespace?)
  return JSON.stringify(q, null, 4);

};