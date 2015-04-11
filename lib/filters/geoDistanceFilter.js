'use strict';

/**
 * @class  ElasticSearch geo distance filter.
 * @augments {Filter}
 * Note: lon before lat, to match GeoJson spec.
 * @param  {number}    distanceValue    Distance scalar.
 * @param  {string}    distanceUnit     Distance unit: See bit.ly/1yjZaiy
 * @param  {number[]}  geoJsonArry      [lon, lat] to match GeoJson spec.
 * @param  {string}    termPath         document path to term containing location.
 * @param  {bool=}     cache            Determine whether to cache the filter. Defaults to true.
 */
function GeoDistanceFilter(distanceValue, distanceUnit, geoJsonArry, termPath, cache) {
  this.geo_distance = {
    distance: distanceValue + distanceUnit
  };
  this.geo_distance[termPath] = geoJsonArry;
  if (cache) this.geo_distance._cache = true;
  return this;
}

module.exports = GeoDistanceFilter;