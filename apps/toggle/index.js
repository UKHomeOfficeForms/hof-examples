'use strict';

const fieldsFilter = require('./behaviours/fields-filter');

module.exports = {
  name: 'toggle',
  baseUrl: '/toggle',
  steps: {
    '/toggle-checkbox': {
      behaviours: [fieldsFilter],
      fields: ['parent-check', 'child1-check', 'child2-check'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete'],
      next: '/complete'
    },
    '/complete': {
      template: 'confirmation'
    }
  }
};
