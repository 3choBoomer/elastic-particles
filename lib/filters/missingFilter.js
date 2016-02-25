'use strict';

/**
 * @class Elasticsearch Missing filter
 * @augments {Filter}
 * @param {string}  field  Field for missing filter.
 * @deprecated since version 2.2 See https://www.elastic.co/guide/en/elasticsearch/reference/2.x/query-dsl-missing-query.html
 */
function MissingFilter(field) {
  throw new Error('The missing filter has been deprecated in elasticsearch 2.2. See https://www.elastic.co/guide/en/elasticsearch/reference/2.x/query-dsl-missing-query.html');
}

module.exports = MissingFilter;