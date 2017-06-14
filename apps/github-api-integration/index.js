'use strict';

// Pass the url as config into the behaviours
const FetchRepos = require('./behaviours/fetch-repos')({
  url: 'https://api.github.com/users/:username/repos'
});
const ValidateName = require('./behaviours/validate-name')({
  url: 'https://api.github.com/users/:username'
});

// Create our steps and
// assign the behaviours
module.exports = {
  name: 'github-api-integration',
  baseUrl: '/github-api-integration',
  steps: {
    '/name': {
      fields: ['name'],
      behaviours: ValidateName,
      next: '/show'
    },
    '/show': {
      behaviours: FetchRepos
    }
  }
};
