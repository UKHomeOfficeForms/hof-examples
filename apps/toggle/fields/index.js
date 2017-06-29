'use strict';

module.exports = {
  'parent-check': {
    mixin: 'checkbox-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'child1',
      toggle: 'child1',
      child: 'input-text'
    }, {
      value: 'child2',
      toggle: 'child2',
      child: 'input-text'
    }]
  },
  'child1-check': {
    dependent: {
      field: 'parent-check',
      value: 'child1'
    }
  },
  'child2-check': {
    dependent: {
      field: 'parent-check',
      value: 'child1'
    }
  },
};
