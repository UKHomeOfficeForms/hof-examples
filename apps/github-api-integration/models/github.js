'use strict';

// https://github.com/UKHomeOfficeForms/hof-model
const Model = require('hof-model');

module.exports = class GithubModel extends Model {

  constructor(attributes, options) {

    // Call super first to create this.options
    super(attributes, options);

    // Set a custom header for the remote API
    this.options.headers = {
      'User-Agent': 'HOF Example API Integration'
    };
  }

  url() {
    // Amend the API address with the
    // `name` submitted by the user
    return this.options.url.replace(':username', this.get('name'));
  }

};
