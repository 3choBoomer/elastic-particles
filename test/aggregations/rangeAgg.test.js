'use strict';
var assert = require('assert');
var RangeAgg = require('../../lib/aggregations/rangeAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

describe('rangeAgg', function() {

  var rangeParam = [
    { from: 0, to: 1 },
    { from: 1, to: 2 }
  ];

  it('should properly structure a range agg', function() {
    var agg = new RangeAgg('fieldName', rangeParam);
    var expectedTermAgg = {
      range: {
        field: 'fieldName',
        ranges: rangeParam
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('is an aggregation', function() {
    var agg = new RangeAgg('fieldName', rangeParam);
    assert(agg instanceof Aggregation);
  });

  it('throws if no field', function() {
    var errFunc = function() {
      new RangeAgg(null, rangeParam);
    };
    assert.throws(errFunc, Error);
  });

  it('throws if no ranges', function() {
    var errFunc = function() {
      new RangeAgg('fieldName');
    };
    assert.throws(errFunc, Error);
  });

  it('throws if no ranges isnt an array', function() {
    var errFunc = function() {
      new RangeAgg('fieldName', {});
    };
    assert.throws(errFunc, Error);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var agg = new RangeAgg('fieldName', rangeParam).setName('aggName');
      assert.equal('aggName', agg.getName());
    });

    it('provides name if not set', function() {
      var agg = new RangeAgg('fieldName', rangeParam);
      assert.equal('fieldNameRange', agg.getName());
    });

  });
});
