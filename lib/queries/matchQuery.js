'use strict';

/**
 * @class Elastic Match query
 * @param {string}  field  Field to match against.
 * @param {string}  query  Query to match againt.
 */       
function MatchQuery(field, query) {
  if (!field) {
    throw new Error('Match query requires a field.');
  }

  this.match = {};
  this.match[field] = query;
}

module.exports = MatchQuery;