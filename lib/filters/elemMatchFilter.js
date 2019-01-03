'use strict';
var _ = require('lodash');
var util = require('../util');
var NestedFilter = require('./nestedFilter');
var BoolFilter = require('./boolFilter');
var TermFilter = require('./termFilter');

/**
 * @class Abstraction that mimics mongoDB's $elemMatch.
 * @augments {Filter}
 * Creates a nested "BOOL" filter including each property.
 */
function ElemMatchFilter(nestPath, element) {
    var attributesFilter = new BoolFilter();
    var termFilters = [];
    _.each(element, function(value, key) {
        var unnested = (key.indexOf('.') < 0);
        var termFilter = new TermFilter(nestPath + '.' + key, value, unnested);
        termFilters.push(termFilter);
    });
    attributesFilter.mustMatch(termFilters);
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
