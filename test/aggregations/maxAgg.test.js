'use strict';
var assert = require('assert');
var MaxAgg = require('../../lib/aggregations/maxAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

describe('maxAgg', function() {

  it('should properly structure a max agg', function() {
    var agg = new MaxAgg('fieldName');
    var expectedTermAgg = {
      max: {
        field: 'fieldName'
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('is an aggregation', function() {
    var agg = new MaxAgg('fieldName');
    assert(agg instanceof Aggregation);
  });

  it('throws if no field', function() {
    var errFunc = function() {
      new MaxAgg();
    };
    assert.throws(errFunc, Error);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var agg = new MaxAgg('fieldName').setName('aggName');
      assert.equal('aggName', agg.getName());
    });

    it('provides name if not set', function() {
      var agg = new MaxAgg('fieldName');
      assert.equal('fieldNameMax', agg.getName());
    });

  });

});