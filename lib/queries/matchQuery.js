'use strict';

/**
 * @class Elastic Match query
 * @param {string}  field  Field to match against.
 * @param {string}  query  Query to match against.
 * @param {string}  operator  (optional) Operator to apply in match query.
 */       
function MatchQuery(field, query, operator) {
  if (!field) {
    throw new Error('Match query requires a field.');
  }

  this.match = {};

  if (!operator) {
    this.match[field] = query;
  } else {
    this.match[field] = {
      query: query,
      operator: operator
    };
  }
}

module.exports = MatchQuery;