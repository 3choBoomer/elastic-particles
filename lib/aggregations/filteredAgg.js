'use strict';
var Aggregation = require('./aggregation');
var util = require('../util');
/**
 * Elastic Filtered Aggregation.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-filter-aggregation.html}
 * TODO: Inherit from Aggregation using node util when prototype funcs needed.
 * Top level object will contain an 'aggs' and 'filter'.
 * @param {Aggregation} innerAgg        Aggregation object to be filtered.
 * @param {Filter|obj}  innerFilter     Filter object to apply to the innerAgg.
 * @param {string}      innerAggname    innerAgg name. Defaults to filteredAggName.
 */
function FilteredAgg(innerAgg, innerFilter, innerAggName) {
  if (!(innerAgg instanceof Aggregation)) {
    throw new Error('Inner aggregation must be an Aggregation object');
  }

  if (!innerFilter) {
    throw new Error('Inner filter must be provided');
  }

  innerAggName = innerAggName || innerAgg.getName();

  if (!innerAggName) {
    throw new Error('innerAggName must be provided as a parameter or assigned to the aggregation');
  }

  this.aggs = {};
  this.aggs[innerAggName] = innerAgg;

  this.filter = innerFilter;
  util.createNonEnumerableProperty(this, '_root', innerAgg._root);
  util.createNonEnumerableProperty(this, '_innerAgg', innerAgg);
}

FilteredAgg.prototype = Object.create(Aggregation.prototype);
FilteredAgg.prototype.constructor = FilteredAgg;

/**
 * @override
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation.
 * @default Defers to innerAgg object.
 */
FilteredAgg.prototype.getName = function getFilteredName() {
  return this._name || this._innerAgg.getName();
};

module.exports = FilteredAgg;