'use strict';
var ElasticQuery = require('../lib/elasticQuery');
var Aggregation = require('../lib/aggregations/aggregation');
var BoolFilter = require('../lib/filters/boolFilter');
var BoolQuery = require('../lib/queries/boolQuery');
var TermFilter = require('../lib/filters/termFilter');
var assert = require('assert');
var sinon = require('sinon');
var _ = require('lodash');

describe('elastic Query', function() {
  var eq;

  beforeEach(function(){
    eq = new ElasticQuery();
  });

  it('constructor sets up 5 internal properties', function () {
    var counter = 0;
    for (var property in eq) {
      if (eq.hasOwnProperty(property) && property.charAt(0) === "_") {
        counter++;
      }
    }
    assert.equal(counter, 5);
  });

  it('constructor sets up 0 external properties', function () {
    var counter = 0;
    for (var property in eq) {
      if (eq.hasOwnProperty(property) && property.charAt(0) !== "_") {
        counter++;
      }
    }
    assert.equal(counter, 0);
  });

  describe('serialize', function(){
    it('exists', function () {
      assert.notEqual(eq.serialize, undefined);
    });

    it('returns a string', function(){
      assert.ok(_.isString(eq.serialize()));
    })

  });

  describe('Queries and Filters', function(){
    describe('setFilter', function() {
      it('exists', function () {
        assert.notEqual(eq.setFilter, undefined);
      });

      it('sets the query.bool.filter object on the serialized result', function(){
        eq.setFilter(new BoolFilter().shouldMatch(new TermFilter('foo', 'bar')));

        var q = eq.serialize();

        assert.deepEqual(JSON.parse(q).query.bool.filter,{"bool": {"should": [{"term": {"foo": "bar"}}] } });
      })

    });

    describe('setQuery', function() {
      it('exists', function () {
        assert.notEqual(eq.setQuery, undefined);
      });

      it('sets the query.bool.filter object on the serialized result', function(){
        eq.setQuery(new BoolQuery().should(["foo", "bar"]));

        var q = eq.serialize();

        assert.deepEqual(JSON.parse(q).query,{"bool": {"should": ["foo", "bar"] } });
      })

    });

    describe('they work together', function(){
      it('properly places the filter inside of the query and preserves the query object', function(){
        eq.setQuery(new BoolQuery().should(["foo", "bar"]));
        eq.setFilter(new BoolFilter().shouldMatch(new TermFilter('foo', 'bar')));

        var q = eq.serialize();

        var queryFormat = {
          bool:{
            should:['foo', 'bar'],
            filter: {
              bool: {
                should: [
                  {term: {foo: 'bar'}}
                ]
              }
            }
          }
        };

        assert.deepEqual(JSON.parse(q).query, queryFormat);
      })


    })
  });



  describe('addAggregation', function(){
    it('exists', function () {
      assert.notEqual(eq.addAggregation, undefined);
    });

    it('throws an error if it can not get a name for aggregation', function(){
      assert.throws(function(){eq.addAggregation(new Aggregation('foo'));}, /Aggregation must be named with a string./);
    });

    it('calls getName on the aggregation if no name is explicitly passed', function() {
      var agg = new Aggregation('foo');
      var aggStub = sinon.stub(agg, 'getName').returns('bar');

      eq.addAggregation(agg);

      assert.ok(aggStub.calledOnce);
    })

  });


  describe('Include/ExcludeFields', function () {
    describe('setExcludeFields', function () {
      it('exists', function () {
        assert.notEqual(eq.setExcludeFields, undefined);
      });

      it('sets the _source.exclude field on the serialized object', function () {
        eq.setExcludeFields('foo');

        var query = JSON.parse(eq.serialize());

        assert.deepEqual(query._source, {exclude: 'foo'});

      });

      it('supports an array of strings', function () {
        eq.setExcludeFields(['foo', 'bar']);

        var query = JSON.parse(eq.serialize());

        assert.deepEqual(query._source, {exclude: ['foo', 'bar']});

      });
    });

    describe('setIncludeFields', function () {
      it('exists', function () {
        assert.notEqual(eq.setIncludeFields, undefined);
      });

      it('sets the _source.include field on the serialized object', function () {
        eq.setIncludeFields('foo');

        var query = JSON.parse(eq.serialize());

        assert.deepEqual(query._source, {include: 'foo'});

      });

      it('supports an array of strings', function () {
        eq.setIncludeFields(['foo', 'bar']);

        var query = JSON.parse(eq.serialize());

        assert.deepEqual(query._source, {include: ['foo', 'bar']});
      });

      it('supports a boolean', function () {
        eq.setIncludeFields(false);

        var query = JSON.parse(eq.serialize());

        assert.deepEqual(query._source, false);
      })
    });

    describe('Include and Exclude work together', function () {
      it('sets the _source.include and exclude fields on the serialized object', function () {
        eq.setIncludeFields('foo');
        eq.setExcludeFields('bar');

        var query = JSON.parse(eq.serialize());

        assert.deepEqual(query._source, {include: 'foo', exclude: 'bar'});

      });

      it('setting Include Fields to boolean overwrites other settings', function () {
        eq.setExcludeFields('foo');
        eq.setIncludeFields(false);

        var query = JSON.parse(eq.serialize());

        assert.deepEqual(query._source, false);
      })
    });

  });

  describe('setSize', function () {

    it('exists', function () {
      assert.notEqual(eq.setSize, undefined);
    });

    it('sets the sort field on the serialized object', function () {
      eq.setSize(1000);

      var query = JSON.parse(eq.serialize());

      assert.equal(query.size, 1000);

    });

    it('throws an error when called with a non-integer', function () {
      assert.throws(function() {eq.setSize('foo');}, Error);
      assert.throws(function() {eq.setSize({});}, Error);
      assert.throws(function() {eq.setSize(['foo', 'bar']);}, Error);
      assert.throws(function() {eq.setSize(1.1);}, Error);
      assert.throws(function() {eq.setSize(Infinity);}, Error);
    });

  });


  describe('setSort', function () {

    it('exists', function () {
      assert.notEqual(eq.setSort, undefined);
    });

    it('sets the sort field on the serialized object', function () {
      eq.setSort('fooField');

      var query = JSON.parse(eq.serialize());

      assert.equal(query.sort, 'fooField');

    });

    it('supports array of strings', function () {
      eq.setSort(['field1', 'field2']);

      var query = JSON.parse(eq.serialize());

      assert.ok(_.isArray(query.sort));
      assert.equal(query.sort[0], 'field1');
      assert.equal(query.sort[1], 'field2');

    });

    it('supports objects', function(){
      var obj = { foo: 1, bar: 2, foobar:{ foo:3, bar:4} };

      eq.setSort(obj);

      var query = JSON.parse(eq.serialize());

      assert.deepEqual(query.sort, obj);
    });

  });
});