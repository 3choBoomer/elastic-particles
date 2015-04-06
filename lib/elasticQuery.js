'use strict';
function ElasticQuery() {
  this._filter = null;

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
 * Sets the query filter to an instance of an Elastic Filter.]
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

ElasticQuery.prototype.serialize = function serializeQuery() {
  var q = {};

  if (this._size) {
    q.size = this._size;
  }
  if (this._aggs) {
    q.aggs = this._aggs;
  }

  if (this._filter) {
    q.query = { 'filtered': { 'filter': this._filter }};
  }

  if (this._source || typeof this._source === 'boolean') {
    q._source = this._source;
  }

  return JSON.stringify(q, null, 4);
};