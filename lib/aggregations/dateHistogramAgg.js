'use strict';
var Aggregation = require('./aggregation');

/**
 * @class  Elastic multi-bucket aggregation that groups by dates.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-datehistogram-aggregation.html|link}
 * @augments {Aggregation}
 * @param {string} field      Name of field to aggregate on.
 * @param {string} interval   One of: year, quarter, month, week, day, hour, minute, or second
 * @param {string} format     Date format pattern {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern|link}
 * @param [respectPostFilter=false] flag to respect any post_filters by applying the filter to the aggregation. Defaults to false.
 */
function DateHistogramAgg(field, interval, format, respectPostFilter) {
  if (!field) {
    throw new Error('Cardinality aggregation requires an aggregation field');
  }

  Aggregation.call(this, 'date_histogram', field, respectPostFilter);
  this._root.interval = interval;

  if (format) {
    this._root.format = format;
  }
}

DateHistogramAgg.prototype = Object.create(Aggregation.prototype);
DateHistogramAgg.prototype.constructor = DateHistogramAgg;

/**
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation. Defaults to '{{field}}DateHistogram'
 */
DateHistogramAgg.prototype.getName = function getDateHistogramName() {
  return this._name || this._root.field + 'DateHistogram';
};

module.exports = DateHistogramAgg;