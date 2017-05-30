API (Github) Integration
========================

This example demonstrates how to integrate a web form with a remote API using Home Office Forms (HOF).
Specifically, this demonstrates how to integrate a HOF form with the Github API. However, this example only uses Github as the remote API in order to provide a potentially real-life example of API integration. With some small tweaks, pertaining to the url, and quite possibly the Model, this example could be repurposed to fit any number of simple API integrations.

If you'd rather get started quickly [skip to install & start](#install-and-start)

# Tutorial

The three main components to this example are the Github model, the behaviours and the apps' `index.js` that configures the specfics of the app.

To begin by writing the Model means when we introduce new components to the stack our upstream dependencies are known quantaties and therefore easier to reason about.

## Models

### Github model

Our Github Model will extend from [hof-model](https://github.com/UKHomeOfficeForms/hof-model).
```js
const Model = require('hof-model');

module.exports = class GithubModel extends Model {}
```

### Setting options at instantiation

We know that [all Github API requests require a User-Agent header](https://developer.github.com/v3/#user-agent-required) so we can start by overriding the parent Model's `constructor` method to ensure all requests carry the correct header.

```js
constructor(attributes, options) {
  // Call super first to create this.options
  super(attributes, options);
  // Set a custom header for the remote api
  this.options.headers = {
    'User-Agent': 'HOF Example API Integration'
  };
}
```
We can call `super` before setting the header to hand off the creation of `this.options` to the parent, base Model.

### Setting the url

The Model's `url` method will be called when any Model API method is called, but before the request to the Github API is invoked.
In our example we override the parent Model's `url` method to return the `url` argument we passed to both the behaviours, replacing `:username` with the `name` entered by the user.

```js
url() {
  // Augment configured url the user entered `name` param
  // that we set on the model in the behaviour
  return this.options.url.replace(':username', this.get('name'));
}
```

When fetch is called from either behaviour, our Model's `url` method returns the url with which to make the request to the Github API.

### Fetch Repos model

Because our `show` view only requires a subset of the full response returned by the API, we extend from the github model, `require` the child model in the `fetch-repos` behaviour and parse the response.

```js
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
```

## Behaviours

Behaviours can be thought of as middleware that are assigned a particular request. Because there are no downstream dependencies we can hook into a systems' pipeline to affect the result of a request without impacting the architecture.

### Validate name
The `validate-name` behaviour needs to check if the name the user has entered is a real Github username. If it is, the behaviour saves the name on the session or renders a user error if it is not.

The behaviour has one method, `validate`, which is called during a POST request when the form is submitted.

```js
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
```

When the request is valid the next step in the system is invoked. In this case `/show` will be loaded and the associated behaviour invoked.
If the request does not meet the validation requirements then the error is assigned to the `locals`, compiled and rendered as a validation message.
If the request fails for a reason other than being unable to find the user, the error is handled by the default error handler and, which in this case will render an error template.


### Fetch repos
The `fetch-repos` behaviour is designed to retrieve the `name` set previously to the session and use it to GET all repositories from the Github API for that user.

The `fetch-repos` beahaviour `require`'s the `fetch-repos` model, a child of the `github` model, which parses the response before returning it to the behaviour.
```js
const Model = require('../models/fetch-repos');
```

It has one method, `getValues`, called on a GET request, which immediately calls upt to `super.getValues` to access the values stored on the previous POST.

```js
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
```

When the request is successful, the repos are assigned to the locals, compiled and rendered in the frontend.
If the request fails then the error is handled by the error handler, which in this case will render an error template.


## index.js

`index.js` is where we tie the pieces of the application together. The `baseUrl` property defines the path at which the application is served. The `steps` object defines the routes and pages of the form, assigns their behaviours and `fields`, as well as determining the navigation (`next`). It is also where we create our behaviours.

```js
// Pass the url as config into the behaviours
const FetchRepos = require('./behaviours/fetch-repos')({
  url: 'https://api.github.com/users/:username/repos'
});
const ValidateName = require('./behaviours/validate-name')({
  url: 'https://api.github.com/users/:username'
});

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
```

When the application is started, the `baseUrl` and step keys, i.e. `/name`, and `/show` are loaded into HOF. Visiting `http://localhost:8080/github-api-integration` redirects to `/name` where a base template is renders a form with a single a text field called "name". On submission of the form the `ValidateName` behaviour is invoked and the Model makes a request to the Github API for a user by with the name the user entered.


# Install and start

```bash
npm i

npm start
```

Then browse to: [http://localhost:8080/github-api-integration](http://localhost:8080/github-api-integration)
