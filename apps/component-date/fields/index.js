'use strict';
const dateComponent = require('hof-component-date');

module.exports = {
  'date-of-birth': dateComponent('date-of-birth', {
    // before means a date cannot be in the future
    validate: ['required', 'date', 'before']
  }),
  'passport-expiry': dateComponent('passport-expiry', {
    // after means a date cannot be in the past
    validate: ['required', 'date', 'after']
  })
};
