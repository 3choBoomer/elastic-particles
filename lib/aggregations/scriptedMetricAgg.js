'use strict';
var Aggregation = require('./aggregation');

/**
 * Elastic metrics aggregation that executes map-reduce style scripts.
 * {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-scripted-metric-aggregation.html}
 * @param {object} scripts  Scripts object containing map-reduce logic.
 *                          {@link http://www.elastic.co/guide/en/elasticsearch/reference/1.x/search-aggregations-metrics-scripted-metric-aggregation.html#_scope_of_scripts}
 *                          Scripts can include: 'init_script', 'map_script', 'combine_script', 'reduce_script'
 */
function ScriptedMetricAgg(scripts) {
  if (!scripts) {
    throw new Error('Scripted metric aggregation requires a scripts object');
  }

  if (!scripts.init_script) {
    throw new Error('Scripted metric aggregation requires an "init_script"');
  }

  Aggregation.call(this, 'scripted_metric');

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