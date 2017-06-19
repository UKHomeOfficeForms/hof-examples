'use strict';
const dateComponent = require('hof-component-date');

module.exports = {
  'date-of-birth': dateComponent('date-of-birth', {
    // before means a date cannot be in the future
    validate: [
      'required',
      {type: 'before', arguments: [18, 'years', 11, 'months']},
      {type: 'after', arguments: '1892-01-01'}
    ]
  })
};
