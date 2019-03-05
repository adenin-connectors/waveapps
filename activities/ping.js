'use strict';

const cfActivity = require('@adenin/cf-activity');
const api = require('./common/api');

module.exports = async (activity) => {
  try {
    api.initialize(activity);
    let query = {
      query:
        `query { 
        user { 
          id
        } 
      }`
    };

    //Ping returns true even if token is completly removed from code, 
    //I think this only occurs after first authentication
    const response = await api.graphql(query);

    activity.Response.Data = {
      success: response && response.statusCode === 200
    };
  } catch (error) {
    cfActivity.handleError(activity, error);
    activity.Response.Data.success = false;
  }
};
