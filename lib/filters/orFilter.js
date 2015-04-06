'use strict';
var TermFilter = require('./termFilter');

/**
 * ElasticSearch OR filter.
 * @param {Filter or [Filters]} Filters to logically OR together. Can be a single filter.
 */
function OrFilter(filters) {
  this.or = filters || [];
}

OrFilter.prototype.addTerm = function addTerm(termName, value) {
  if (!value) return this;

  this.or.push(new TermFilter(termName, value));
  return this;
};

OrFilter.prototype.addFilter = function addFilter(filter) {
  if (filter) { this.or.push(filter); }
  return this;
};

OrFilter.prototype.isEmpty = function isEmpty() {
  return (this.or.length <= 0);
};

module.exports = OrFilter;