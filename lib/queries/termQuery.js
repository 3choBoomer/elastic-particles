'use strict';

/**
 * @class Elastic Term query for not analyzed fields.
 * @param {string}  field  Field to match against.
 * @param {string}  query  Query to match againt.
 */       
function TermQuery(field, query) {
  if (!field) {
    throw new Error('Term query requires a field.');
  }

  this.term = {};
  this.term[field] = query;
}

module.exports = TermQuery;