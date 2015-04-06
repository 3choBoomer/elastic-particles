'use strict';
var assert = require('assert');
var ScriptedMetricAgg = require('../../lib/aggregations/scriptedMetricAgg');
var Aggregation = require('../../lib/aggregations/aggregation');

describe('scriptedMetricAgg', function() {

  var scripts;

  beforeEach(function() {
    scripts = {
      init_script: 'init',
      map_script: 'map',
      combine_script: 'combine',
      reduce_script: 'reduce'
    };
  });

  it('should properly structure a scripted metric agg', function() {
    var agg = new ScriptedMetricAgg(scripts);
    var expectedTermAgg = {
        scripted_metric: scripts
    };
    assert.deepEqual(agg, expectedTermAgg);
  });

  it('throws if no scripts', function() {
    var errFunc = function() {
      new ScriptedMetricAgg();
    };
    assert.throws(errFunc, Error);
  });

  it('throws if no init_script', function() {
    scripts.init_script = undefined;
    var errFunc = function() {
      new ScriptedMetricAgg(scripts);
    };
    assert.throws(errFunc, Error);
  });

  it('is an aggregation', function() {
    var agg = new ScriptedMetricAgg(scripts);
    assert(agg instanceof Aggregation);
  });
  
});
