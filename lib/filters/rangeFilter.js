'use strict';
var _ = require('lodash');

function RangeFilter(term) {
  this.range = {};
  this.range[term] = {};
}
module.exports = RangeFilter;

RangeFilter.prototype.lte = function lte(value) {
  var term = _.keys(this.range)[0];
  this.range[term].lte = value;
  return this;
};

RangeFilter.prototype.gte = function gte(value) {
  var term = _.keys(this.range)[0];
  this.range[term].gte = value;
  return this;
};

RangeFilter.prototype.lt = function lt(value) {
  var term = _.keys(this.range)[0];
  this.range[term].lt = value;
  return this;
};

RangeFilter.prototype.gt = function gt(value) {
  var term = _.keys(this.range)[0];
  this.range[term].gt = value;
  return this;
};