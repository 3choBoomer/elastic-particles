'use strict';
var Aggregation = require('./aggregation');
var util = require('../util');

/**
 * Elastic Nested Aggregation.
 * Wraps other aggregation instances.
 * TODO: allow multiple 'this.aggs'
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-nested-aggregation.html}
 * {nested: { path: 'pathstring' }, aggs: { 'innerAggName': { AGGREGATION } }}
 * @param {Aggregation} innerAgg        Inner aggregation object.
 * @param {string}      nestPath        @optional path of nested document fields. 
 *                                      If not provided, expects innerAgg to have a 'field' property and will infer.
 *                                      Ex: innerAgg field='x.y.z', path will be 'x.y'.
 * @param {string}      innerAggName    @optional Aggregation name for inner agg.
 * Structure works around {@link/https://github.com/elasticsearch/elasticsearch/issues/4449}
 */
function NestedAgg(innerAgg, nestPath, innerAggName) {

  if (!(innerAgg instanceof Aggregation)) {
    throw new Error('Inner aggregation must be an Aggregation object');
  }

  innerAggName = innerAggName || innerAgg.getName();

  if (!innerAggName) {
    throw new Error('Inner aggregation name must be provided for a nested aggregation');
  }

  Aggregation.call(this, 'nested');
  this._root.path = nestPath || extractField(innerAgg);

  this.aggs = {};
  this.aggs[innerAggName] = innerAgg;
  util.createNonEnumerableProperty(this, '_innerAgg', innerAgg);
}

NestedAgg.prototype = Object.create(Aggregation.prototype);
NestedAgg.prototype.constructor = NestedAgg;


/**
 * @override
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation.
 * @default Defers to innerAgg object.
 */
NestedAgg.prototype.getName = function getNestedName() {
  return this._name || this._innerAgg.getName();
};

module.exports = NestedAgg;

/**
 * Gets the path to the parent object of the desired property.
 * EX: 'w.x.y.z' returns 'w.x.y' as a string.
 */
function extractField(innerAgg) {
  if (!innerAgg._root.field) {
    throw new Error('Nested aggregations require a nestPath if inner aggregation has no field property');
  }

  var parts = innerAgg._root.field.split('.');
  parts.pop(); //remove everything after last period.
  return parts.join('.');
}