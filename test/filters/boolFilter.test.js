'use strict';
var assert = require('assert');
var BoolFilter = require('../../lib/filters/boolFilter');

describe('boolFilter', function() {

  it('constructor just builds bool', function() {
    var filter = new BoolFilter();
    assert.deepEqual({bool: {}}, filter);
  });

});