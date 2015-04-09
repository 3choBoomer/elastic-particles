'use strict';

function MatchQuery(field, query) {
  if (!field) {
    throw new Error('Match query requires a field.');
  }

  this.match = {};
  this.match[field] = query;
}

module.exports = MatchQuery;