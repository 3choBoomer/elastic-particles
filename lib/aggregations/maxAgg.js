'use strict';
var Aggregation = require('./aggregation');

/**
 * Elasticsearch metrics aggregation that calculates the max value for the field.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-max-aggregation.html}
 * @param {string} field  Name of field to aggregate on.
 */
function MaxAgg(field) {
  if (!field) {
    throw new Error('Max aggregation requires an aggregation field');
  }

  Aggregation.call(this, 'max', field);
}

MaxAgg.prototype = Object.create(Aggregation.prototype);
MaxAgg.prototype.constructor = MaxAgg;

/**
 * @override
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation.
 * @default '{{field}}Max'
 */
MaxAgg.prototype.getName = function getMaxName() {
  return this._name || this._root.field + 'Max';
};

module.exports = MaxAgg;