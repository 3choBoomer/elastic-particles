'use strict';
var assert = require('assert');
var BoolQuery = require('../../lib/queries/boolQuery');

describe('boolQuery', function() {

  var query1 = {
    "type": { value: "query1" }
  };

  var query2 = {
    "type": { value: "query2" }
  }

  it('#constructor just builds bool', function() {
    var query = new BoolQuery();
    assert.deepEqual({bool: {}}, query);
  });

  describe('#must', function() {

    it('works for first query', function() {
      var query = new BoolQuery().must(query1);
      var expected = {
        bool: {
          must: [query1]
        }
      };
      assert.deepEqual(expected, query);
    });

    it('works with array', function() {
      var query = new BoolQuery().must([query1, query2]);
      var expected = {
        bool: {
          must: [query1, query2]
        }
      };
      assert.deepEqual(expected, query);
    });

    it('works for additional queries', function() {
      var query = new BoolQuery().must(query1).must(query2);
      var expected = {
        bool: {
          must: [query1, query2]
        }
      };
      assert.deepEqual(expected, query);
    });

  });

  describe('#mustNot', function() {

    it('works for first query', function() {
      var query = new BoolQuery().mustNot(query1);
      var expected = {
        bool: {
          must_not: [query1]
        }
      };
      assert.deepEqual(expected, query);
    });

    it('works with array', function() {
      var query = new BoolQuery().mustNot([query1, query2]);
      var expected = {
        bool: {
          must_not: [query1, query2]
        }
      };
      assert.deepEqual(expected, query);
    });

    it('works for additional queries', function() {
      var query = new BoolQuery().mustNot(query1).mustNot(query2);
      var expected = {
        bool: {
          must_not: [query1, query2]
        }
      };
      assert.deepEqual(expected, query);
    });

  });

  describe('#should', function() {

    it('works for first query', function() {
      var query = new BoolQuery().should(query1);
      var expected = {
        bool: {
          should: [query1]
        }
      };
      assert.deepEqual(expected, query);
    });

    it('works with array', function() {
      var query = new BoolQuery().should([query1, query2]);
      var expected = {
        bool: {
          should: [query1, query2]
        }
      };
      assert.deepEqual(expected, query);
    });

    it('works for additional queries', function() {
      var query = new BoolQuery().should(query1).should(query2);
      var expected = {
        bool: {
          should: [query1, query2]
        }
      };
      assert.deepEqual(expected, query);
    });

  });

  it('is chainable', function() {
    var query = new BoolQuery()
      .should(query1)
      .must(query2)
      .mustNot(query2)
      .must(query1);
    var expected = {
      bool: {
        should: [query1],
        must: [query2, query1],
        must_not: [query2]
      }
    };
    assert.deepEqual(expected, query);
  });

  it('#setBoost works/chained', function() {
    var query = new BoolQuery().setBoost(5);
    var expected = { bool: { boost: 5}};
    assert.deepEqual(query, expected);
  });


});