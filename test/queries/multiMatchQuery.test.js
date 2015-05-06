'use strict';
var assert = require('assert');
var MultiMatchQuery = require('../../lib/queries/multiMatchQuery');

describe('multiMatchQuery', function() {

  it('#constructor basic multi_match query', function() {
    var query = new MultiMatchQuery('john smith', ['name.first', 'name.last']);
    var expected = {
      multi_match: {
        query: 'john smith',
        fields: ['name.first', 'name.last'],
      }
    };
    assert.deepEqual(expected, query);
  });

  it('#constructor defaults fields to empty array', function() {
    var query = new MultiMatchQuery('john smith');
    var expected = { multi_match: { query: 'john smith', fields: [] }};
    assert.deepEqual(expected, query);
  })

  it('#setType can set the type', function() {
    var query = new MultiMatchQuery('john smith', ['name.first', 'name.last'])
      .setType('cross_fields');
    var expected = {
      multi_match: {
        query: 'john smith',
        fields: ['name.first', 'name.last'],
        type: 'cross_fields'
      }
    };
    assert.deepEqual(expected, query);
  })

  it('#setType can set a tie breaker between 0 and 1', function() {
    var query = new MultiMatchQuery('john smith', ['name.first', 'name.last'])
      .setTieBreaker(0.7);
    var expected = {
      multi_match: {
        query: 'john smith',
        fields: ['name.first', 'name.last'],
        tie_breaker: 0.7
      }
    };
    assert.deepEqual(expected, query);
  })

  it('#setType throws if tie breaker is not a number', function() {
    var query = new MultiMatchQuery('john smith', ['name.first', 'name.last'])
    var errFunc = function() {
      query.setTieBreaker('0.7');
    };
    assert.throws(errFunc, Error);
  })

  it('#addField adds provided field', function() {
    var query = new MultiMatchQuery('john smith')
      .addField('field1')
      .addField('field2');
    var expected = {
      multi_match: {
        query: 'john smith',
        fields: ['field1', 'field2']
      }
    };
    assert.deepEqual(expected, query);
  })

  it('#setBoost chainable is boost setter', function() {
    var query = new MultiMatchQuery('john smith')
      .setBoost("1")
      .setBoost(2.5);
    var expected = {
      multi_match: {
        query: 'john smith',
        fields: [],
        boost: 2.5
      }
    };
    assert.deepEqual(expected, query);
  });

});