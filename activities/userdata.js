'use strict';
const api = require('./common/api');

module.exports = async function (activity) {
  try {
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
    api.initialize(activity);
    const response = await api.graphql(query);
    if ($.isErrorResponse(activity, response)) return;

    activity.Response.Data = convertResponse(response);
  } catch (error) {
    $.handleError(activity, error);
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