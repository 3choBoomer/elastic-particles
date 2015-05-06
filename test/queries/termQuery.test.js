'use strict';
var assert = require('assert');
var TermQuery = require('../../lib/queries/termQuery');

describe('termQuery', function() {

  it('#constructor accepts a field and query', function() {
    var query = new TermQuery('person.name', 'dwayne carter');
    var expected = { term: { 'person.name': 'dwayne carter' }};
    assert.deepEqual(expected, query);
  });

  it('#constructor throws if no field', function() {
    assert.throws(function() { new TermQuery(null, 'name') }, Error);
  });

});