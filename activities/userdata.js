'use strict';

const cfActivity = require('@adenin/cf-activity');
const api = require('./common/api');

module.exports = async function (activity) {

  try {
    api.initialize(activity);
    let query = {
      query:
        `query { 
        user { 
          id
          firstName
          lastName
          defaultEmail
        } 
      }`
    };
    const response = await api.graphql(query);

    if (!cfActivity.isResponseOk(activity, response)) {
      return;
    }

    activity.Response.Data = convertResponse(response);
  } catch (error) {
    cfActivity.handleError(activity, error);
  }
};
//**maps response data to items */
function convertResponse(response) {
  let items = [];
  let raw = response.body.data.user;

  let item = { id: raw.id, title: raw.firstName, description: raw.defaultEmail, link: raw.url, raw: raw };
  items.push(item);

  return { items: items };
}