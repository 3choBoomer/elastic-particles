'use strict';
var util = require('../util');

/**
 * @class  Base elastic aggregation.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations.html|link}
 * @todo: Add script option.
 *
 * @param {string}  type  Aggregation type, ex: "geo_bounds";
 * @param {string=} field Set the aggregation field. Commonly used in simple
 *                       aggs such as min or max.
 */
function Aggregation(type, field) {
  if (!type) {
    throw new Error('Must specify an aggregation type');
  }

  this[type] = {};
  //Convenient access to type and this[type] for child aggs.
  util.createNonEnumerableProperty(this, '_root', this[type]);

  if (field) {
    this._root.field = field;
  }
}

/**
 * Attach a name to the aggregation object. Can be used when attaching the aggregation to a query.
 * Convenience method to allow responsibility of the name to be given to the creator of the aggregation object.
 * Can be accessed directly but won't show up during serialization.
 * @param {string}   name   Name of aggregation.
 */
Aggregation.prototype.setName = function setName(name) {
  util.createNonEnumerableProperty(this, '_name', name);
  return this;
};

/**
 * Get the name of the aggregation object.
 * Returns undefined if not set.
 * @return {string} Name of aggregation.
 */
Aggregation.prototype.getName = function getName() {
  return this._name;
};

module.exports = Aggregation;