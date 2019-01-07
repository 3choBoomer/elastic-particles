'use strict';

/**
 * @class  Elasticsearch Nested Query filter.
 * @augments {Filter}
 * @param {string} path   Nest path for document to filter.
 * @param {Filter} filter Elastic filter instance to filter on the path.
 */
function NestedQueryFilter(path, filter) {
  this.nested = {
    path: path,
    query: filter || {}
  };
}

NestedQueryFilter.prototype.setQueryFilter = function setQueryFilter(filter) {
  this.nested.query = filter;
};

module.exports = NestedQueryFilter;