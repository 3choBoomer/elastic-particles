'use strict';
var Aggregation = require('./aggregation');

/**
 * @class  Elastic metrics aggregation that executes map-reduce style scripts.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-scripted-metric-aggregation.html|link}
 * @augments {Aggregation}
 * @param {Object} scripts  Scripts object containing map-reduce logic.
 *
 { 'init_script': 'script',  'map_script':'script', 'combine_script':'script', 'reduce_script':'script' }
 */
function ScriptedMetricAgg(scripts) {
  if (!scripts) {
    throw new Error('Scripted metric aggregation requires a scripts object');
  }

  if (!scripts.map_script) {
    throw new Error('Scripted metric aggregation requires an "map_script"');
  }

  Aggregation.call(this, 'scripted_metric');

  for (var key in scripts) {
    if (scripts.hasOwnProperty(key)) {
      this._root[key] = scripts[key];
    }
  }
}

ScriptedMetricAgg.prototype = Object.create(Aggregation.prototype);
ScriptedMetricAgg.prototype.constructor = ScriptedMetricAgg;

module.exports = ScriptedMetricAgg;