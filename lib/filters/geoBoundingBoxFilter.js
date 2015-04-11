'use strict';

/**
 * @class ElasticSearch geo bounding box filter.
 * @augments {Filter}
 * Sets _cache to true.
 * @todo  implement base filter with cache control
 * Note: lon before lat, to match GeoJson spec.
 *
 * If you have 2 points [Southwest, Northeast], pass lon1, lat1, lon2, lat2
 * 
 * @param {string}         termPath        document path to term containing location.
 * @param {string|number}  west            Longitude of WESTERN point.
 * @param {string|number}  south           Latitude of SOUTHERN point.
 * @param {string|number}  east            Longitude of EASTERN point.
 * @param {string|number}  north           Latitude of NORTHERN point.
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