'use strict';

const Model = require('./github');

module.exports = class FetchReposModel extends Model {

  // Parse the response from the
  // API so we return only a subset of the results
  parse(results) {
    return results.map(repo => ({
      name: repo.name,
      desc: repo.description,
      url: repo.html_url
    }));
  }

};
