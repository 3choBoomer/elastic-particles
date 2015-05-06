'use strict';
var assert = require('assert');
var RangeQuery = require('../../lib/queries/rangeQuery');

describe('rangeQuery', function() {

  it('#constructor accepts a field', function() {
    var query = new RangeQuery('date');
    var expected = { range: { date: {} }};
    assert.deepEqual(query, expected);
  });

  it('#constructor throws if no field', function() {
    assert.throws(function() { new RangeQuery(null) }, Error);
  });

  it('#lt can be set/chained', function() {
    var query = new RangeQuery('date').lt('mydate');
    var expected = { range: { date: { lt: 'mydate'}}};
    assert.deepEqual(query, expected);
  });

  it('#lte can be set/chained', function() {
    var query = new RangeQuery('date').lte('mydate');
    var expected = { range: { date: { lte: 'mydate'}}};
    assert.deepEqual(query, expected);
  });

  it('#gt can be set/chained', function() {
    var query = new RangeQuery('date').gt('mydate');
    var expected = { range: { date: { gt: 'mydate'}}};
    assert.deepEqual(query, expected);
  });

  it('#gte can be set/chained', function() {
    var query = new RangeQuery('date').gte('mydate');
    var expected = { range: { date: { gte: 'mydate'}}};
    assert.deepEqual(query, expected);
  });

  it('#setBoost works/chained', function() {
    var query = new RangeQuery('date').setBoost(5);
    var expected = { range: { date: { boost: 5}}};
    assert.deepEqual(query, expected);
  });

});