'use strict';

/**
 * @class Elastic Exists query
 * @param {string}  fieldName  Name of Field that must exist.
 */
function ExistsQuery(fieldName) {
  if (!fieldName) {
    throw new Error('Exists query requires a fieldName.');
  }

  this.exists = {};
  this.exists.field = fieldName;
}

module.exports = ExistsQuery;