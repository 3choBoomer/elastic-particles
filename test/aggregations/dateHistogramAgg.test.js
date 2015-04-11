'use strict';
var assert = require('assert');
var DateHistogramAgg = require('../../lib/aggregations/dateHistogramAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

describe('dateHistogramAgg', function() {

  it('should properly structure a date histogram agg', function() {
    var agg = new DateHistogramAgg('fieldName', 'month', 'yyyy-MM');
    var expectedTermAgg = {
      date_histogram: {
        field: 'fieldName',
        interval: 'month',
        format: 'yyyy-MM'
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('works without a format', function() {
    var agg = new DateHistogramAgg('fieldName', 'month');
    var expectedTermAgg = {
      date_histogram: {
        field: 'fieldName',
        interval: 'month'
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('is an aggregation', function() {
    var agg = new DateHistogramAgg('fieldName', 'month');
    assert(agg instanceof Aggregation);
  });

  it('throws if no field', function() {
    var errFunc = function() {
      new DateHistogramAgg(null, 'month', 'yyyy-MM');
    };
    assert.throws(errFunc, Error);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var agg = new DateHistogramAgg('fieldName', 'month').setName('aggName');
      assert.equal('aggName', agg.getName());
    });

    it('provides name if not set', function() {
      var agg = new DateHistogramAgg('fieldName', 'month');
      assert.equal('fieldNameDateHistogram', agg.getName());
    });

  });

});
