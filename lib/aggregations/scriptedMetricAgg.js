'use strict';
var Aggregation = require('./aggregation');

/**
 * @class  Elastic metrics aggregation that executes map-reduce style scripts.
 * 
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-scripted-metric-aggregation.html|link}
 * @augments {Aggregation}
 * @param {Object} scripts  Scripts object containing map-reduce logic.
 * @param {boolean} [respectPostFilter=false] flag to respect any post_filters by applying the filter to the aggregation. Defaults to false.
 *
 { 'init_script': 'script',  'map_script':'script', 'combine_script':'script', 'reduce_script':'script' }
 */
function ScriptedMetricAgg(scripts, respectPostFilter) {
  if (!scripts) {
    throw new Error('Scripted metric aggregation requires a scripts object');
  }

  if (!scripts.init_script) {
    throw new Error('Scripted metric aggregation requires an "init_script"');
  }

  Aggregation.call(this, 'scripted_metric', undefined, respectPostFilter);

  this._root.init_script = scripts.init_script;

  if (scripts.map_script) {
    this._root.map_script = scripts.map_script;
  }

  if (scripts.combine_script) {
    this._root.combine_script = scripts.combine_script;
  }

  if (scripts.reduce_script) {
    this._root.reduce_script = scripts.reduce_script;
  }
}

ScriptedMetricAgg.prototype = Object.create(Aggregation.prototype);
ScriptedMetricAgg.prototype.constructor = ScriptedMetricAgg;

module.exports = ScriptedMetricAgg;