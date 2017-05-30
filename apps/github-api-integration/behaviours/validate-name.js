'use strict';

const Model = require('../models/github');
const ValidationError = require('hof-form-controller').ValidationError;

module.exports = config => {

  return superclass => class extends superclass {

    // The validate method is part of the POST pipeline. For details
    // see https://github.com/UKHomeOfficeForms/hof-behaviour-hooks.
    validate(req, res, next) {
      const name = req.form.values.name;

      // Define an instance of the Model
      // with attributes and config (uri)
      const model = new Model({name}, config);

      model.fetch()
        .then(() => {
          // Save the user name and continue
          req.sessionModel.set('name', name);
          return super.validate(req, res, next);
        })
        .catch(error => {
          if (error.status === 404) {
            // When a user name which is not associated
            // with an GitHub account is submitted
            // inform the user with a custom
            // Validation error
            error = {
              'name': new ValidationError('name', {
                type: 'not-found'
              })
            };
          }
          // When the error is anything else
          // let the error bubble up to the errorhandler
          next(error);
        });
    }

  };

};
