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
    const response = await api.graphql(query);

    activity.Response.Data = {
      success: response && response.statusCode === 200
    };
  } catch (error) {
    Activity.handleError(error);
    activity.Response.Data.success = false;
  }
};
