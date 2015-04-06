'use strict';
var assert = require('assert');
var GeoDistanceAgg = require('../../lib/aggregations/geoDistanceAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

describe('geoDistanceAgg', function() {

  it('should properly format a geo distance agg with specified number of rings.', function() {
    var agg = new GeoDistanceAgg('fieldName', [1.111, 2.222], 'km', 3, 10);
    var expectedAgg = {
      geo_distance: {
        field: 'fieldName',
        unit: 'km',
        origin: [1.111, 2.222],
        ranges: [
        {
          from: 0,
          to: 10
        },
        {
          from: 10,
          to: 20
        },
        {
          from: 20,
          to: 30
        }
        ]
      }
    };
    assert.deepEqual(agg, expectedAgg);
  });

  it('is an aggregation', function() {
    var agg = new GeoDistanceAgg('fieldName', [1.111, 2.222], 'km', 3, 10);
    assert(agg instanceof Aggregation);
  });

  it('throws if no field', function() {
    var errFunc = function() {
      new GeoDistanceAgg(null, [1.111, 2.222], 'km', 3, 10);
    };
    assert.throws(errFunc, Error);
  });

  it('throws if no origin', function() {
    var errFunc = function() {
      new GeoDistanceAgg('fieldName', null, 'km', 3, 10);
    };
    assert.throws(errFunc, Error);
  });

  describe('getName', function() {

    it('returns set name', function() {
      var agg = new GeoDistanceAgg('fieldName', [1.111, 2.222], 'km', 3, 10).setName('aggName');
      assert.equal('aggName', agg.getName());
    });

    it('provides name if not set', function() {
      var agg = new GeoDistanceAgg('fieldName', [1.111, 2.222], 'km', 3, 10);
      assert.equal('fieldNameGeoDistance', agg.getName());
    });

  });


});