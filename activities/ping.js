'use strict';
const api = require('./common/api');

module.exports = async (activity) => {
  try {
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
    api.initialize(activity);
    const response = await api.graphql(query);
    if ($.isErrorResponse(activity,response)) return;

    activity.Response.Data = {
      success: response && response.statusCode === 200
    };
  } catch (error) {
    $.handleError(activity, error);
    activity.Response.Data.success = false;
  }
};
