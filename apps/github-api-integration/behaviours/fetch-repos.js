'use strict';

const Model = require('../models/fetch-repos');

// Behaviour wrapped in a function here
// allows us to pass in a config
module.exports = config => {

  return superclass => class extends superclass {

    // `getValues` is part of the GET pipeline. For details
    // see https://github.com/UKHomeOfficeForms/hof-behaviour-hooks.
    getValues(req, res, next) {

      // Call super to retrieve the values
      super.getValues(req, res, (err, values) => {
        if (err) {
          // Return early on error
          return next(err);
        }
        // Define an instance of the Model
        // with attributes and config (uri)
        const model = new Model({name: values.name}, config);

        // Call `fetch` to get the resource
        // from the url we configured
        model.fetch().then(repos => {

          // Augment the values from super
          // with the repos from the API
          values.repos = repos;

          // Call back with the values
          next(null, values);
        })
        .catch(err => {
          // Let the error bubble up to the errorhandler
          next(err);
        });
      });

    }

  };

};
