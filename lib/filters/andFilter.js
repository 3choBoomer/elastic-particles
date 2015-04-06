'use strict';
var TermFilter = require('./termFilter');

/**
 * ElasticSearch AND filter.
 * @param {Filter or [Filters]} Filters to logically AND together. Can be a single filter.
 */
function AndFilter(filters) {
  this.and = filters || [];
}

AndFilter.prototype.addTerm = function addTerm(termName, value, noNest) {
  this.and.push(new TermFilter(termName, value, noNest));
  return this;
};

AndFilter.prototype.addFilter = function addFilter(filter) {
  if (filter) { this.and.push(filter); }
  return this;
};

module.exports = AndFilter;