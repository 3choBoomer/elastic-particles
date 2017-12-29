'use strict';
var Aggregation = require('./aggregation');

/**
 * @class  Elastic metrics aggregation that calculates the max value for the field.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-max-aggregation.html|link}
 * @augments {Aggregation}
 * @param {string} field  Name of field to aggregate on.
 * @param [respectPostFilter=false] flag to respect any post_filters by applying the filter to the aggregation. Defaults to false.
 */
function MaxAgg(field, respectPostFilter) {
  if (!field) {
    throw new Error('Max aggregation requires an aggregation field');
  }

  Aggregation.call(this, 'max', field, respectPostFilter);
}

MaxAgg.prototype = Object.create(Aggregation.prototype);
MaxAgg.prototype.constructor = MaxAgg;

/**
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation. Default to '{{field}}Max'
 */
MaxAgg.prototype.getName = function getMaxName() {
  return this._name || this._root.field + 'Max';
};

module.exports = MaxAgg;