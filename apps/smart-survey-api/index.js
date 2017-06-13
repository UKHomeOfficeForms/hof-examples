'use strict';

// Pass the url as config into the behaviours
const FetchSurveyDetails = require('/behaviours/fetch-survey-details')({
  url: 'https://api.smartsurvey.io/v1/surveys/:surveyId/responses?api_token=:apiToken&api_token_secret=:apiTokenSecret'
})

module.exports = {
  name: 'smart-survey-api',
  baseUrl: '/smart-survey-api',
  steps: {
    '/survey-id': {
      fields: ['survey-id'],
      next: '/response'
    },
    '/response': {
    }
  }
}
