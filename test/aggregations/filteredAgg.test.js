'use strict';
var assert = require('assert');
var FilteredAgg = require('../../lib/aggregations/filteredAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

function Filter(){ this.filter = 'filter'; }

describe('filteredAgg', function() {
  var innerAgg, innerFilter;

  beforeEach(function() {
    innerAgg = new Aggregation('type').setName('innerAggName');
    innerFilter = new Filter();
  });

  it('defined aggs and filter', function() {
    var agg = new FilteredAgg(innerAgg, innerFilter, 'innerAggNameOverride');
    var expectedAgg = {
      aggs: {
        "innerAggNameOverride": innerAgg
      },
      filter: innerFilter
    };
    assert.deepEqual(agg, expectedAgg);
  });

  it('can use assigned innerAgg name', function() {
    var agg = new FilteredAgg(innerAgg, innerFilter);
    var expectedAgg = {
      aggs: {
        "innerAggName": innerAgg
      },
      filter: innerFilter
    };
    assert.deepEqual(agg, expectedAgg);
  });

  it('is an aggregation', function() {
    var agg = new FilteredAgg(innerAgg, innerFilter, 'innerAggName');
    assert(agg instanceof Aggregation);
  });

  it('alises innerAgg as _innerAgg', function() {
    var agg = new FilteredAgg(innerAgg, innerFilter, 'innerAggName');
    assert.equal(innerAgg, agg._innerAgg);
  });

  it('alises inner agg root as _root', function() {
    var agg = new FilteredAgg(innerAgg, innerFilter, 'innerAggName');
    assert.equal(innerAgg._root, agg._root);
  });

  it('inherits from inner agg', function() {
    var agg = new FilteredAgg(innerAgg, innerFilter, 'innerAggName');
    assert.equal(agg._root, innerAgg._root);
  });

  it('throws if no innerAgg', function() {
    var errFunc = function() {
      new FilteredAgg(null, new Filter(), 'innerAggName');
    };
    assert.throws(errFunc, Error);
  });

  it('throws if no innerFilter', function() {
    var errFunc = function() {
      new FilteredAgg(new Aggregation('type'), null);
    };
    assert.throws(errFunc, Error);
  });

  it('throws if no innerAggName', function() {
    var errFunc = function() {
      new FilteredAgg(new Aggregation('type'), new Filter(), null);
    };
    assert.throws(errFunc, Error);
  });

  it('throws if innerAgg is not an Aggregation', function() {
    var errFunc = function() {
      new FilteredAgg({}, new Filter());
    };
    assert.throws(errFunc, Error);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var agg = new FilteredAgg(innerAgg, innerFilter, 'innerAggName').setName('nameOverride');
      assert.equal('nameOverride', agg.getName());
    });

    it('uses inner agg name', function() {
      var innerAgg = new Aggregation('type', 'parent1.field1').setName('nameFromInnerAgg');
      var agg = new FilteredAgg(innerAgg, innerFilter, 'innerAggName');
      assert.equal('nameFromInnerAgg', agg.getName());
    });

  });

});