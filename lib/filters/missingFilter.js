'use strict';

function MissingFilter(term) {
  this.missing = {
    'field': term
  };
}

module.exports = MissingFilter;