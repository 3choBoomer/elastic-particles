'use strict';

/**
 * Creates a geo bounding box ElasticSearch filter.
 * Sets _cache to true.
 * Note: lon before lat, to match GeoJson spec.
 *
 * If you have 2 points [Southwest, Northeast], pass lon1, lat1, lon2, lat2
 * 
 * @param {string}            termPath     document path to term containing location.
 * @param {string|int|float}  west         Longitude of WESTERN point.
 * @param {string|int|float}  south        Latitude of SOUTHERN point.
 * @param {string|int|float}  east         Longitude of EASTERN point.
 * @param {string|int|float}  north        Latitude of NORTHERN point.
 * @return {Filter}                        Filter object constructed. Serializes to geo filter.
 */
function GeoBoundingBoxFilter(termPath, west, south, east, north) {
  this.geo_bounding_box = {
    _cache: true
  };
  
  this.geo_bounding_box[termPath] = {
    left: parseFloat(west),
    bottom: parseFloat(south),
    right: parseFloat(east),
    top: parseFloat(north),
  };
}

module.exports = GeoBoundingBoxFilter;