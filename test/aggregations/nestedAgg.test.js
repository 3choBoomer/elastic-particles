'use strict';
var assert = require('assert');
var NestedAgg = require('../../lib/aggregations/nestedAgg');
var Aggregation = require('../../lib/aggregations/aggregation');


describe('nestedAgg', function() {

  it('should properly structure a nested terms agg', function() {
    var innerAgg = new Aggregation('type', 'parent.termName1');
    var agg = new NestedAgg(innerAgg, 'nestPathOverride', 'innerAggName');
    var expectedAgg = {
      nested: {
        path: 'nestPathOverride',
      },
      aggs: {
        'innerAggName': innerAgg
      }
    };
    assert.deepEqual(agg, expectedAgg);
  });

  it('should infer the nestPath if not provided', function() {
    var innerAgg = new Aggregation('type', 'parent.termName1');
    var agg = new NestedAgg(innerAgg, null, 'innerAggName');
    var expectedAgg = {
      nested: {
        path: 'parent',
      },
      aggs: {
        'innerAggName': innerAgg
      }
    };
    assert.deepEqual(agg, expectedAgg);
  });

  it('should infer deep nesting', function() {
    var innerAgg = new Aggregation('type', 'parent1.parent2.termName1');
    var agg = new NestedAgg(innerAgg, null, 'innerAggName');
    var expectedAgg = {
      nested: {
        path: 'parent1.parent2',
      },
      aggs: {
        'innerAggName': innerAgg
      }
    };
    assert.deepEqual(agg, expectedAgg);
  });

  it('can use assigned innerAgg name', function() {
    var innerAgg = new Aggregation('type', 'parent1.field1').setName('nameFromInnerAgg');
    var agg = new NestedAgg(innerAgg);
    var expectedAgg = {
      nested: {
        path: 'parent1',
      },
      aggs: {
        'nameFromInnerAgg': innerAgg
      }
    };
    assert.deepEqual(agg, expectedAgg);
  });

  it('is an aggregation', function() {
    var innerAgg = new Aggregation('type', 'parent1.parent2.termName1');
    var agg = new NestedAgg(innerAgg, null, 'innerAggName');
    assert(agg instanceof Aggregation);
  });

  it('alises innerAgg as _innerAgg', function() {
    var innerAgg = new Aggregation('type', 'parent1.parent2.termName1');
    var agg = new NestedAgg(innerAgg, null, 'innerAggName');
    assert.equal(innerAgg, agg._innerAgg);
  });

  it('throws if no innerAggName', function() {
    var errFunc = function() {
      new NestedAgg(new Aggregation('type', 'f'));
    };
    assert.throws(errFunc, Error);
  });

  it('throws if no innerAgg', function() {
    var errFunc = function() {
      new NestedAgg(null,  'nestPath', 'innerAggName');
    };
    assert.throws(errFunc, Error);
  });

  it('throws if innerAgg is not an Aggregation', function() {
    var errFunc = function() {
      new NestedAgg({}, 'innerAggName');
    };
    assert.throws(errFunc, Error);
  });

  it('throws if nest path cannot resolved', function() {
    var errFunc = function() {
      new NestedAgg(new Aggregation('type'), 'innerAggName');
    };
    assert.throws(errFunc, Error);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var innerAgg = new Aggregation('type', 'parent1.field1').setName('nameFromInnerAgg');
      var agg = new NestedAgg(innerAgg, null, 'innerAggName').setName('nameOverride');
      assert.equal('nameOverride', agg.getName());
    });

    it('uses inner agg name', function() {
      var innerAgg = new Aggregation('type', 'parent1.field1').setName('nameFromInnerAgg');
      var agg = new NestedAgg(innerAgg, null, 'innerAggName');
      assert.equal('nameFromInnerAgg', agg.getName());
    });

  });

});