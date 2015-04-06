'use strict';
var TermFilter = require('./termFilter');

/**
 * ElasticSearch boolean filter.
 * @param {string} termName If provided, creates a "must" condition on this term.
 * @param {any} value       If provided, termName must equal this value.
 */
function BoolFilter() {
  this.bool = {};
}

module.exports = BoolFilter;


BoolFilter.prototype.mustEqualTerm = function filterMustEqual(termName, value) {
  if (value === undefined || value === null) return this;

  if (!this.bool.must) this.bool.must = [];
  this.bool.must.push(new TermFilter(termName, value));

  return this;
};

BoolFilter.prototype.mustNotEqualTerm = function filterMustNotEqual(termName, value) {
  if (value === undefined || value === null) return this;

  if (!this.bool.must_not) this.bool.must_not = [];
  this.bool.must_not.push(new TermFilter(termName, value));

  return this;
};

BoolFilter.prototype.mustMatch = function mustMatch(filters) {
  if (!filters) return this;

  if (!this.bool.must) this.bool.must = [];
  this.bool.must = this.bool.must.concat(filters);

  return this;
};

BoolFilter.prototype.mustNotMatch = function mustNotMatch(filters) {
  if (!filters) return this;

  if (!this.bool.must_not) this.bool.must_not = [];
  this.bool.must_not = this.bool.must_not.concat(filters);

  return this;
};

BoolFilter.prototype.shouldEqual = function shouldEqual(termName, value) {
  if (value === undefined || value === null) return this;

  if (!this.bool.should) this.bool.should = [];
  this.bool.should.push(new TermFilter(termName, value));

  return this;
};

BoolFilter.prototype.shouldMatch = function shouldMatch(filters) {
  if (!filters) return this;

  if (!this.bool.should) this.bool.should = [];
  this.bool.should = this.bool.should.concat(filters);

  return this;
};

//Add remaining methods for the should section of the bool query. It is the most logical place for us to put geographies.