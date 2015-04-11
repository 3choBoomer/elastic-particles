'use strict';

/**
 * @class  Elasticsearch Nested filter.
 * @augments {Filter}
 * @param {string} path   Nest path for document to filter.
 * @param {Filter} filter Elastic filter instance to filter on the path.
 */
function NestedFilter(path, filter) {
  this.nested = {
    path: path,
    filter: filter || {}
  };
}

NestedFilter.prototype.setFilter = function setFilter(filter) {
  this.nested.filter = filter;
};

module.exports = NestedFilter;
