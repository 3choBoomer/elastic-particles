'use strict';

/**
 * @class Elasticsearch Missing filter
 * @augments {Filter}
 * @param {string}  field  Field for missing filter.
 */
function MissingFilter(field) {
  this.missing = {
    'field': field
  };
}

module.exports = MissingFilter;