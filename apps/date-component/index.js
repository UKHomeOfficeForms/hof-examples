'use strict';

module.exports = {
  name: 'date-component',
  baseUrl: '/date-component',
  steps: {
    '/date-of-birth': {
      fields: ['date-of-birth'],
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
