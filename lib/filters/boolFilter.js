'use strict';
var TermFilter = require('./termFilter');

/**
 * @class  ElasticSearch Bool filter.
 *
 * @{@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/query-dsl-bool-filter.html|link}
 * @augments {Filter}
 */
function BoolFilter() {
  this.bool = {};
}

module.exports = BoolFilter;


BoolFilter.prototype.mustEqualTerm = function filterMustEqual(field, value, doNotNest) {
  if (value === undefined || value === null) return this;

  if (!this.bool.must) this.bool.must = [];
  this.bool.must.push(new TermFilter(field, value, doNotNest));

  return this;
};

BoolFilter.prototype.mustNotEqualTerm = function filterMustNotEqual(field, value, doNotNest) {
  if (value === undefined || value === null) return this;

  if (!this.bool.must_not) this.bool.must_not = [];
  this.bool.must_not.push(new TermFilter(field, value, doNotNest));

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

BoolFilter.prototype.shouldEqual = function shouldEqual(field, value, doNotNest) {
  if (value === undefined || value === null) return this;

  if (!this.bool.should) this.bool.should = [];
  this.bool.should.push(new TermFilter(field, value, doNotNest));

  return this;
};

BoolFilter.prototype.shouldMatch = function shouldMatch(filters) {
  if (!filters) return this;

  if (!this.bool.should) this.bool.should = [];
  this.bool.should = this.bool.should.concat(filters);

  return this;
};
