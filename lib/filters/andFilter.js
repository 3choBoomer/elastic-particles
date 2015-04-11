'use strict';
var TermFilter = require('./termFilter');

/**
 * @class ElasticSearch And filter.
 *
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/query-dsl-and-filter.html|link}
 * @augments {Filter}
 * @param {Filter|Filter[]} filters=[]] Filters to logically AND together. Can be a single filter.
 */
function AndFilter(filters) {
  this.and = filters || [];
}

/**
 * Shorthand to create and add a term filter.
 * @param {string}  field  Term filter field.    
 * @param {any}     value  Value to filter on.
 * @param {bool=}   noNest If true, term filter will not automatically infer nesting. 
 */
AndFilter.prototype.addTerm = function addTerm(termName, value, noNest) {
  this.and.push(new TermFilter(termName, value, noNest));
  return this;
};

/**
 * Add a filter.
 * @param {Filter} filter   Filter instance to add.
 */
AndFilter.prototype.addFilter = function addFilter(filter) {
  if (filter) { this.and.push(filter); }
  return this;
};

module.exports = AndFilter;