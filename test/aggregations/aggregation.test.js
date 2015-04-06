'use strict';
var Aggregation = require('../../lib/aggregations/aggregation');
var assert = require('assert');


describe('Aggregation', function() {
  it('throws if no type', function() {
    var errorFunc = function() {
      new Aggregation();
    };
    assert.throws(errorFunc, Error);
  });

  it('sets type as root', function() {
    var agg = new Aggregation('t');
    assert(agg.t);
  });

  it('aliases agg root as _root', function() {
    var agg = new Aggregation('t');
    assert.deepEqual(agg.t, agg._root);
  });

  it('doesnt set field if null', function() {
    var agg = new Aggregation('t', undefined);
    assert(!agg.t.field);
  });

  it('sets field if passed', function() {
    var agg = new Aggregation('t', 'f');
    assert.equal('f', agg.t.field);
  });

  describe('setName', function() {

    it('assigns the name to _name', function() {
      var agg = new Aggregation('t').setName('aggName');
      assert.equal('aggName', agg._name);
    });

    it('returns "this" for chaining', function() {
      var agg = new Aggregation('t');
      assert.equal(agg, agg.setName('n'));
    });

    it('doesnt serialize', function() {
      var agg = new Aggregation('t').setName('aggName');
      var newAgg = JSON.parse(JSON.stringify(agg));
      assert.equal(undefined, newAgg._name);
    });

  });

  it('can get the name when set', function() {
    var agg = new Aggregation('t').setName('aggName');
    assert.equal('aggName', agg.getName());
  });

});