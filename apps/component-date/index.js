'use strict';
const summary = require('hof-behaviour-summary-page');

module.exports = {
  name: 'component-date',
  baseUrl: '/component-date',
  steps: {
    '/date-of-birth': {
      fields: ['date-of-birth'],
      next: '/passport-expiry'
    },
    '/passport-expiry': {
      fields: ['passport-expiry'],
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
