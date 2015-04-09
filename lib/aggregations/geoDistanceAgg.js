'use strict';
var Aggregation = require('./aggregation');

/**
 * Elastic Geo Distance Aggregation.
 * Abstracted to create concentric rings of uniform radius.
 * TODO: Optionally pass in "ranges" array directly.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-bucket-geodistance-aggregation.html}
 * @param  {string} field              Name of term to aggregate on.
 * @param  {point}  origin             Elasticsearch geo_point type. {PS: Lat, Lon if string, [Lon, Lat] if array.}
 * @param  {string} unit               Elasticsearch geo distance unit. @default 'm'
 * @param  {int}    rings              Number of concentric distance rings to bucket by.
 * @param  {number} ringRadiusInterval For each concetric ring, increase radius but this many units.
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
 * @override
 * Get the name of the aggregation object.
 * @return {string} Name of aggregation.
 * @default '{{field}}GeoDistance'
 */
GeoDistanceAgg.prototype.getName = function getGeoDistanceName() {
  return this._name || this._root.field + 'GeoDistance';
};

module.exports = GeoDistanceAgg;