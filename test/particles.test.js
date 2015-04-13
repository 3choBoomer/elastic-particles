'use strict';
var particles = require('../lib/particles');
var assert = require('assert');


describe('Particles', function() {
  
  it('exposes 23 things', function() {
    var counter = 0;
    for (var property in particles) {
      if (particles.hasOwnProperty(property)) {
        counter++;
      }
    }
    assert.equal(counter, 23);
  });
  
  it('exposes ElasticQuery', function() {
    assert.notEqual(particles.ElasticQuery, undefined);
  });
  
  it('exposes MultiMatchQuery', function() {
    assert.notEqual(particles.MultiMatchQuery, undefined);
  });
  
  it('exposes BoolQuery', function() {
    assert.notEqual(particles.BoolQuery, undefined);
  });
  
  it('exposes MatchQuery', function() {
    assert.notEqual(particles.MatchQuery, undefined);
  });
  
  it('exposes AndFilter', function() {
    assert.notEqual(particles.AndFilter, undefined);
  });
  
  it('exposes BoolFilter', function() {
    assert.notEqual(particles.BoolFilter, undefined);
  });
  
  it('exposes ElemMatchFilter', function() {
    assert.notEqual(particles.ElemMatchFilter, undefined);
  });
  
  it('exposes NestedFilter', function() {
    assert.notEqual(particles.NestedFilter, undefined);
  });
  
  it('exposes OrFilter', function() {
    assert.notEqual(particles.OrFilter, undefined);
  });
  
  it('exposes TermFilter', function() {
    assert.notEqual(particles.TermFilter, undefined);
  });
  
  it('exposes RangeFilter', function() {
    assert.notEqual(particles.RangeFilter, undefined);
  });
  
  it('exposes GeoDistanceFilter', function() {
    assert.notEqual(particles.GeoDistanceFilter, undefined);
  });
  
  it('exposes GeoBoundingBoxFilter', function() {
    assert.notEqual(particles.GeoBoundingBoxFilter, undefined);
  });
  
  it('exposes MissingFilter', function() {
    assert.notEqual(particles.MissingFilter, undefined);
  });
  
  it('exposes CardinalityAgg', function() {
    assert.notEqual(particles.CardinalityAgg, undefined);
  });
  
  it('exposes DateHistogramAgg', function() {
    assert.notEqual(particles.DateHistogramAgg, undefined);
  });
  
  it('exposes FilteredAgg', function() {
    assert.notEqual(particles.FilteredAgg, undefined);
  });
  
  it('exposes GeoDistanceAgg', function() {
    assert.notEqual(particles.GeoDistanceAgg, undefined);
  });
  
  it('exposes MaxAgg', function() {
    assert.notEqual(particles.MaxAgg, undefined);
  });
  
  it('exposes NestedAgg', function() {
    assert.notEqual(particles.NestedAgg, undefined);
  });
  
  it('exposes RangeAgg', function() {
    assert.notEqual(particles.RangeAgg, undefined);
  });
  
  it('exposes ScriptedMetricAgg', function() {
    assert.notEqual(particles.ScriptedMetricAgg, undefined);
  });
  
  it('exposes TermsAgg', function() {
    assert.notEqual(particles.TermsAgg, undefined);
  });
  
});