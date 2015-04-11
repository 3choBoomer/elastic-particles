'use strict';
var NestedFilter = require('./nestedFilter');
var util = require('../util');

/**
 * @class Elastic Term or Terms filter. Automatically handles nested term filters if necessary.
 * @augments {Filter}
 * @param {string}   fieldPath     Field property - can be nested [x.y].
 * @param {any}      value         Value to match property.
 * @param {bool=}    doNotNest     If true, will not automatically create nested term.
 */ 
function TermFilter(fieldPath, value, doNotNest) {

  //Build term or terms depending on value type.
  var filterType = Array.isArray(value) ? 'terms' : 'term';

  //Check if we want to infer a nested term filter.
  if (fieldPath.indexOf('.') > -1 && !doNotNest) {
    createNested(this, fieldPath, value);
  } else {
    createTerm(this, fieldPath, value, filterType);
  }
}

module.exports = TermFilter;

/** This filter automatically becomes a Nested filter if it detects depth. */
function createNested(scope, termPath, value) {
  util.merge(scope, new NestedFilter(getPath(termPath), new TermFilter(termPath, value, true)));
}

function createTerm(scope, fieldPath, value, filterType) {
  scope[filterType] = {};
  scope[filterType][fieldPath] = value;
}

/**
 * Gets the path to the parent object of the desired property.
 * EX: 'w.x.y.z' returns 'w.x.y' as a string.
 */
function getPath(termPath) {
  var parts = termPath.split('.');
  parts.pop(); //remove everything after last period.
  return parts.join('.');
}