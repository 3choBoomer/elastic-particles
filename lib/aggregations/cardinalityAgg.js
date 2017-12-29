'use strict';
var Aggregation = require('./aggregation');

/**
 * @class Elastic metrics aggregation that calculates an approximate count of distinct values for a field.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-cardinality-aggregation.html|link}
 * @augments {Aggregation}
 * @param {string} field  Name of field to aggregate on.
 * @param {boolean} [respectPostFilter=false] flag to respect any post_filters by applying the filter to the aggregation. Defaults to false.
 */
function CardinalityAgg(field, respectPostFilter) {
  if (!field) {
    throw new Error('Cardinality aggregation requires an aggregation field');
  }

  Aggregation.call(this, 'cardinality', field, respectPostFilter);
}

CardinalityAgg.prototype = Object.create(Aggregation.prototype);
CardinalityAgg.prototype.constructor = CardinalityAgg;

/**
 * Get the name of the aggregation object.
 * Defaults to '{{field}}Cardinality'
 * @return {string} Name of aggregation.
 */
CardinalityAgg.prototype.getName = function getCardinalityName() {
  return this._name || this._root.field + 'Cardinality';
};

module.exports = CardinalityAgg;