'use strict';

/**
 * Creates a geo distance ElasticSearch filter.
 * Note: lon before lat, to match GeoJson spec.
 * @param  {int}               distanceValue    Distance scalar.
 * @param  {string}            distanceUnit     Distance unit: See bit.ly/1yjZaiy
 * @param  {[number, number]}  geoJsonArry      [lon, lat] to match GeoJson spec.
 * @param  {string}            termPath         document path to term containing location.
 * @param  {bool}              cache            Determine whether to cache the filter. Defaults to true.
 * @return {Filter}                             Filter object constructed. Serializes to geo filter.
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