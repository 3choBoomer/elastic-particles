'use strict';

/**
 * Elastic match query allowing multiple fields.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/query-dsl-multi-match-query.html}
 * @param {string} query   query string
 * @param {Array}  fields  Array of fields to query on.
 */
function MultiMatchQuery(query, fields) {
  this.multi_match = {
    query: query,
    fields: fields || []
  };
  
};

/**
 * Set the query type.
 * @param {string} type Type of multi_match query. Default is "best_fields"; 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/query-dsl-multi-match-query.html#multi-match-types}
 */
MultiMatchQuery.prototype.setType = function setType(type) {
  this.multi_match.type = type;
  return this;
}

/**
 * Set a tie breaker for the query to reduce the weight of additional matching fields.
 * @param {[number]} weight Number between 0 and 1.
 */
MultiMatchQuery.prototype.setTieBreaker = function setTieBreaker(weight) {
  if (typeof weight !== 'number' || weight < 0 || weight > 1) {
    throw new Error('Query tie breaker must be a value between 0 and 1.');
  }
  this.multi_match.tie_breaker = weight;
  return this;
}

/**
 * Add provided field to match queries.
 * @param {string} field Name of field, wildcards allowed.
 */
MultiMatchQuery.prototype.addField = function addField(field) {
  this.multi_match.fields.push(field);
  return this;
}

module.exports = MultiMatchQuery;