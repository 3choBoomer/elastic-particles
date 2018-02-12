'use strict';
var assert = require('assert');
var MatchQuery = require('../../lib/queries/matchQuery');

describe('matchQuery', function() {

  it('#constructor accepts a field and query', function() {
    var query = new MatchQuery('person.name', 'dwayne carter');
    var expected = { match: { 'person.name': 'dwayne carter' }};
    assert.deepEqual(expected, query);
  });

  it('#constructor accepts a field, query, and operator', function() {
    var query = new MatchQuery('person.name', 'dwayne carter', 'and');
    var expected = { match: { 'person.name': { query: 'dwayne carter', operator: 'and' }}};
    assert.deepEqual(expected, query);
  });

  it('#constructor throws if no field', function() {
    assert.throws(function() { new MatchQuery(null, 'name') }, Error);
  });

});