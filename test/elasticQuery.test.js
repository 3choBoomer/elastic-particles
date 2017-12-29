'use strict';
var ElasticQuery = require('../lib/elasticQuery');
var BoolFilter = require('../lib/filters/boolFilter');
var TermFilter = require('../lib/filters/termFilter');
var TermsAgg = require('../lib/aggregations/termsAgg');
var assert = require('assert');
var eq;

var post_filterQuery = '{\n' +
  '    "post_filter": {\n' +
  '        "bool": {\n' +
  '            "must": [\n' +
  '                {\n' +
  '                    "term": {\n' +
  '                        "foo": "bar"\n' +
  '                    }\n' +
  '                }\n' +
  '            ]\n' +
  '        }\n' +
  '    }\n' +
  '}';

var post_filterAgg ='{\n' +
  '    "post_filter": {\n' +
  '        "bool": {\n' +
  '            "must": [\n' +
  '                {\n' +
  '                    "term": {\n' +
  '                        "foo": "bar"\n' +
  '                    }\n' +
  '                }\n' +
  '            ]\n' +
  '        }\n' +
  '    },\n' +
  '    "aggs": {\n' +
  '        "fooTerms": {\n' +
  '            "aggs": {\n' +
  '                "fooTerms": {\n' +
  '                    "terms": {\n' +
  '                        "field": "foo"\n' +
  '                    }\n' +
  '                }\n' +
  '            },\n' +
  '            "filter": {\n' +
  '                "bool": {\n' +
  '                    "must": [\n' +
  '                        {\n' +
  '                            "term": {\n' +
  '                                "foo": "bar"\n' +
  '                            }\n' +
  '                        }\n' +
  '                    ]\n' +
  '                }\n' +
  '            }\n' +
  '        }\n' +
  '    }\n' +
  '}';

describe('ElasticQuery', function() {

  beforeEach(function(){
    eq = new ElasticQuery();

  });
  
  it('returns a post_filter', function() {
    eq.setPostFilter(new BoolFilter().mustMatch(new TermFilter('foo', 'bar')));
    let query = eq.serialize();
    assert.equal(query, post_filterQuery);
  });

  it('aggs respect the respectPostFilter', function() {
    eq.setPostFilter(new BoolFilter().mustMatch(new TermFilter('foo', 'bar')))
      .addAggregation(new TermsAgg('foo', undefined, true));
    let query = eq.serialize();
    console.log(query);
    assert.equal(query, post_filterAgg);
  });

});