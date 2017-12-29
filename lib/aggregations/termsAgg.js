'use strict';
var Aggregation = require('./aggregation');

/**
 * @class  Elastic metrics aggregation that calculates an approximate count of distinct values for a field.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-cardinality-aggregation.html|link}
 * @augments {Aggregation}
 * @param {string} field  Name of field to aggregate on.
 * @param {int=}   size   Number of buckets to return. Size 0 returns all buckets.
 * @param [respectPostFilter=false] flag to respect any post_filters by applying the filter to the aggregation. Defaults to false.
 */
function TermsAgg(field, size, respectPostFilter) {
  if (!field) {
    throw new Error('Terms aggregation requires an aggregation field');
  }

  Aggregation.call(this, 'terms', field, respectPostFilter);
  if (size || size === 0) {
    this._root.size = size;
  }
}

TermsAgg.prototype = Object.create(Aggregation.prototype);
TermsAgg.prototype.constructor = TermsAgg;

/**
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation. Default to '{{field}}Terms'
 */
TermsAgg.prototype.getName = function getTermsName() {
  return this._name || this._root.field + 'Terms';
};

module.exports = TermsAgg;