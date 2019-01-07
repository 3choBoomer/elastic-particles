'use strict';

/**
 * @class  Elasticsearch Nested Query.
 * @augments {Query}
 * @param {string} path   Nest path for document to query.
 * @param {Query} query Elastic filter instance to query on the path.
 */
function NestedQuery(path, query) {
  this.nested = {
    path: path,
    query: query || {}
  };
}

NestedQuery.prototype.setQuery = function setQuery(query) {
  this.nested.query = query;
};

module.exports = NestedQuery;