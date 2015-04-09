'use strict';
var Aggregation = require('./aggregation');

/**
 * Elastic multi-bucket aggregation that groups by defined ranges.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-range-aggregation.html}
 * @param {string} field  Name of field to aggregate on.
 * @param {Array}  ranges Array of objects containing 'to' and 'from' properties for each bucket.
 */
function RangeAgg(field, ranges) {
  if (!field) {
    throw new Error('Range aggregation requires an aggregation field');
  }

  if (!(ranges instanceof Array)) {
    throw new Error('Range aggregation requires an array of ranges');
  }

  Aggregation.call(this, 'range', field);
  this._root.ranges = ranges;

}

RangeAgg.prototype = Object.create(Aggregation.prototype);
RangeAgg.prototype.constructor = RangeAgg;

/**
 * @override
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation.
 * @default '{{field}}Range'
 */
RangeAgg.prototype.getName = function getRangeName() {
  return this._name || this._root.field + 'Range';
};

module.exports = RangeAgg;