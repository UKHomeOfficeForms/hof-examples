'use strict';

module.exports = {
  'parent-check': {
    mixin: 'checkbox-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'child1-check',
      toggle: 'child1-check',
      child: 'input-text'
    }, {
      value: 'child2-check',
      toggle: 'child2-check',
      child: 'input-text'
    }]
  },
  'child1-check': {
    dependent: {
      field: 'parent-check',
      value: 'child1-check'
    }
  },
  'child2-check': {
    dependent: {
      field: 'parent-check',
      value: 'child2-check'
    }
  },
  'parent-radio': {
    mixin: 'radio-group',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'child1-radio',
      toggle: 'child1-radio',
      child: 'input-text'
    }, {
      value: 'child2-radio',
      toggle: 'child2-radio',
      child: 'input-text'
    }]
  },
  'child1-radio': {
    dependent: {
      field: 'parent-radio',
      value: 'child1-radio'
    }
  },
  'child2-radio': {
    dependent: {
      field: 'parent-radio',
      value: 'child2-radio'
    }
  },
};
