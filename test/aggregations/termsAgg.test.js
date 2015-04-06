'use strict';
var assert = require('assert');
var TermsAgg = require('../../lib/aggregations/termsAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

describe('termsAgg', function() {

  it('should properly structure a terms agg', function() {
    var agg = new TermsAgg('fieldName');
    var expectedTermAgg = {
      terms: {
        field: 'fieldName'
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('sets size if passed', function() {
    var agg = new TermsAgg('fieldName', 100);
    var expectedTermAgg = {
      terms: {
        field: 'fieldName',
        size: 100
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('sets 0 size', function() {
    var agg = new TermsAgg('fieldName', 0);
    var expectedTermAgg = {
      terms: {
        field: 'fieldName',
        size: 0
      }
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('is an aggregation', function() {
    var agg = new TermsAgg('fieldName', 0);
    assert(agg instanceof Aggregation);
  });

  it('throws if no field', function() {
    var errFunc = function() {
      new TermsAgg();
    };
    assert.throws(errFunc, Error);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var agg = new TermsAgg('fieldName').setName('aggName');
      assert.equal('aggName', agg.getName());
    });

    it('provides name if not set', function() {
      var agg = new TermsAgg('fieldName');
      assert.equal('fieldNameTerms', agg.getName());
    });

  });

});