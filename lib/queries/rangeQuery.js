'use strict';
var _ = require('lodash');

/**
 * @class Elastic Range query.
 * @param {string}  field  Field to range against.
 */       
function RangeQuery(field) {
  if (!field) {
    throw new Error('Range query requires a field.');
  }

  this.range = {};
  this.range[field] = {};
}

/**
 * Set less than/ equal to.
 * @param  {any} value
 */
RangeQuery.prototype.lte = function lte(value) {
  var field = _.keys(this.range)[0];
  this.range[field].lte = value;
  return this;
};

/**
 * Set greater than/ equal to.
 * @param  {any} value
 */
RangeQuery.prototype.gte = function gte(value) {
  var field = _.keys(this.range)[0];
  this.range[field].gte = value;
  return this;
};

/**
 * Set less than.
 * @param  {any} value
 */
RangeQuery.prototype.lt = function lt(value) {
  var field = _.keys(this.range)[0];
  this.range[field].lt = value;
  return this;
};

/**
 * Set greater than.
 * @param  {any} value
 */
RangeQuery.prototype.gt = function gt(value) {
  var field = _.keys(this.range)[0];
  this.range[field].gt = value;
  return this;
};

/**
 * Set query boost.
 * @param {number} boostFactor Number, string representation
 *                             of number, or undefined to unset.
 */
RangeQuery.prototype.setBoost = function setBoost(boostFactor) {
  var field = _.keys(this.range)[0];
  this.range[field].boost = boostFactor;
  return this;
};

module.exports = RangeQuery;