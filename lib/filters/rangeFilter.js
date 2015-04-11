'use strict';
var _ = require('lodash');

/**
 * @class ElasticSearch Range filter.
 * @augments {Filter}
 * @param {string} field  Name of field to filter.
 */
function RangeFilter(field) {
  this.range = {};
  this.range[field] = {};
}
module.exports = RangeFilter;

RangeFilter.prototype.lte = function lte(value) {
  var field = _.keys(this.range)[0];
  this.range[field].lte = value;
  return this;
};

RangeFilter.prototype.gte = function gte(value) {
  var field = _.keys(this.range)[0];
  this.range[field].gte = value;
  return this;
};

RangeFilter.prototype.lt = function lt(value) {
  var field = _.keys(this.range)[0];
  this.range[field].lt = value;
  return this;
};

RangeFilter.prototype.gt = function gt(value) {
  var field = _.keys(this.range)[0];
  this.range[field].gt = value;
  return this;
};