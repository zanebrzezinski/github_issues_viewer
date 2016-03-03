var $ = require('jQuery');
var ApiActions = require('../actions/api_actions');

issuesUtil = {
  fetchIssues: function(page, cb, errorCb) {
    page = page || 1;
    $.ajax({
      type: "GET",
      url: "https://api.github.com/repos/npm/npm/issues",
      data: {page: page, access_token: "e5a0ec350e0ca7ecc8a88f2b53c69e6c2831087f"},
      dataType: "json",
      success: function(data, textStatus, request) {
        //parse out last page number from response
        lastPage = request.getResponseHeader(
          "link").split(" ")[2]
          .split("=")[1]
          .split(">")[0];

        ApiActions.receiveIssues(data);
        cb && cb(page, lastPage);
      },
      error: function() {
        errorCb && errorCb();
      }
    });
  },

  fetchComments: function(url, errorCb) {
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      data: {access_token: "e5a0ec350e0ca7ecc8a88f2b53c69e6c2831087f"},
      success: function(data) {
        ApiActions.receiveComments(data);
      },
      error: function() {
        errorCb && errorCb();
      }
    });
  }
};

module.exports = issuesUtil;
