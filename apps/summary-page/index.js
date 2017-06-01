'use strict';

const summary = require('hof-behaviour-summary-page');

module.exports = {
  name: 'summary-page',
  baseUrl: '/summary-page-example',
  steps: {
    '/name': {
      fields: ['name'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete', summary],
      next: '/complete'
    },
    '/complete': {
      template: 'confirmation'
    }
  }
};
