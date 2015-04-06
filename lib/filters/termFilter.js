'use strict';
var NestedFilter = require('./nestedFilter');
var util = require('../util');

/**
 * Elastic Term or Terms filter. Handles nested term filters if necessary.
 * @param {termName} termName Term property - can be nested [x.y].
 * @param {any} value         Value to match property.
 * @param {doNotNest} bool     If true, will not automatically create nested term.
 */ 
function TermFilter(termName, value, doNotNest) {

  //Build term or terms depending on value type.
  var filterType = Array.isArray(value) ? 'terms' : 'term';

  //Check if we want to infer a nested term filter.
  if (termName.indexOf('.') > -1 && !doNotNest) {
    createNested(this, termName, value);
  } else {
    createTerm(this, termName, value, filterType);
  }
}

module.exports = TermFilter;

/** This filter automatically becomes a Nested filter if it detects depth. */
function createNested(scope, termPath, value) {
  util.merge(scope, new NestedFilter(getPath(termPath), new TermFilter(termPath, value, true)));
}

function createTerm(scope, termName, value, filterType) {
  scope[filterType] = {};
  scope[filterType][termName] = value;
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