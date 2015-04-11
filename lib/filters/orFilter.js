'use strict';
var TermFilter = require('./termFilter');

/**
 * @class ElasticSearch Or filter.
 * @augments {Filter}
 * @param {Filter|Filter[]} filters  Filters to logically OR together. Can be a single filter.
 */
function OrFilter(filters) {
  this.or = filters || [];
}

OrFilter.prototype.addTerm = function addTerm(field, value) {
  if (!value) return this;

  this.or.push(new TermFilter(field, value));
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