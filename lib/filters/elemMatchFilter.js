'use strict';
var _ = require('lodash');
var util = require('../util');
var NestedFilter = require('./nestedFilter');
var AndFilter = require('./andFilter');

/**
 * @class Abstraction that mimics mongoDB's $elemMatch.
 * @augments {Filter}
 * Creates a nested "AND" filter including each property.
 */
function ElemMatchFilter(nestPath, element) {
  var attributesFilter = new AndFilter();
  _.each(element, function(value, key) {
    var unnested = (key.indexOf('.') < 0);
    attributesFilter.addTerm(nestPath + '.' + key, value, unnested);
  });

  util.createNonEnumerableProperty(this, 'attributesFilter', attributesFilter);
  util.merge(this, new NestedFilter(nestPath, attributesFilter));
  return this;
}

module.exports = ElemMatchFilter;

ElemMatchFilter.prototype.addFilter = function addFilter(filter) {
  if (filter) {
    this.nested.filter.and.push(filter);
  }
  return this;
};
