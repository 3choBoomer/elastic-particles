'use strict';
var assert = require('assert');
var CardinalityAgg = require('../../lib/aggregations/cardinalityAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

describe('cardinalityAgg', function() {

  it('should properly structure a cardinality agg', function() {
    var agg = new CardinalityAgg('fieldName');
    var expectedTermAgg = {
      cardinality: {
        field: 'fieldName'
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('throws if no field', function() {
    var errFunc = function() {
      new CardinalityAgg();
    };
    assert.throws(errFunc, Error);
  });

  it('is an aggregation', function() {
    var agg = new CardinalityAgg('fieldName');
    assert(agg instanceof Aggregation);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var agg = new CardinalityAgg('fieldName').setName('aggName');
      assert.equal('aggName', agg.getName());
    });

    it('provides name if not set', function() {
      var agg = new CardinalityAgg('fieldName');
      assert.equal('fieldNameCardinality', agg.getName());
    });

  });

});