'use strict';
var Aggregation = require('./aggregation');

/**
 * @class  Elastic Geo Distance Aggregation.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-geodistance-aggregation.html|link}
 * @augments {Aggregation}
 * @param  {string}           field              Name of term to aggregate on.
 * @param  {number[]|string}  origin             Elasticsearch geo_point type. {PS: Lat, Lon if string, [Lon, Lat] if array.}
 * @param  {string}           unit               Elasticsearch geo distance unit. @default 'm'
 * @param  {int}              rings              Number of concentric distance rings to bucket by.
 * @param  {number}           ringRadiusInterval For each concetric ring, increase radius but this many units.
 * 
 * @todo: Optionally pass in "ranges" array directly or provide 2 methods.
 */
function GeoDistanceAgg(field, origin, unit, rings, ringRadiusInterval) {
  if (!field) {
    throw new Error('Geo Distance aggregation requires an aggregation field.');
  }

  if (!origin) {
    throw new Error('Geo Distance aggregation requires an origin (geo_point)');
  }

  Aggregation.call(this, 'geo_distance', field);
  this._root.origin = origin;
  this._root.ranges = [];

  if (unit) {
    this._root.unit = unit;
  }

  var radius = 0;
  for (var i = 0; i < rings; i++) {
    this._root.ranges.push({
      from: radius,
      to: radius += ringRadiusInterval
    });
  }
}

GeoDistanceAgg.prototype = Object.create(Aggregation.prototype);
GeoDistanceAgg.prototype.constructor = GeoDistanceAgg;

/**
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation. Defaults to '{{field}}GeoDistance'
 */
GeoDistanceAgg.prototype.getName = function getGeoDistanceName() {
  return this._name || this._root.field + 'GeoDistance';
};

module.exports = GeoDistanceAgg;