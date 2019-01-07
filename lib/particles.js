'use strict';
exports.ElasticQuery = require('./elasticQuery');
exports.MultiMatchQuery = require('./queries/multiMatchQuery');
exports.BoolQuery = require('./queries/boolQuery');
exports.MatchQuery = require('./queries/matchQuery');
exports.TermQuery = require('./queries/termQuery');
exports.RangeQuery = require('./queries/rangeQuery');
exports.ExistsQuery = require('./queries/existsQuery');
exports.NestedQuery = require('./queries/nestedQuery');

exports.BoolFilter = require('./filters/boolFilter');
exports.ElemMatchFilter = require('./filters/elemMatchFilter');
exports.NestedFilter = require('./filters/nestedFilter');
exports.TermFilter = require('./filters/termFilter');
exports.RangeFilter = require('./filters/rangeFilter');
exports.GeoDistanceFilter = require('./filters/geoDistanceFilter');
exports.GeoBoundingBoxFilter = require('./filters/geoBoundingBoxFilter');
exports.MissingFilter = require('./filters/missingFilter');

exports.CardinalityAgg = require('./aggregations/cardinalityAgg');
exports.DateHistogramAgg = require('./aggregations/dateHistogramAgg');
exports.FilteredAgg = require('./aggregations/filteredAgg');
exports.GeoDistanceAgg = require('./aggregations/geoDistanceAgg');
exports.MaxAgg = require('./aggregations/maxAgg');
exports.NestedAgg = require('./aggregations/nestedAgg');
exports.RangeAgg = require('./aggregations/rangeAgg');
exports.ScriptedMetricAgg = require('./aggregations/scriptedMetricAgg');
exports.TermsAgg = require('./aggregations/termsAgg');

exports.AggParser = require('./util').parseAggResponse;