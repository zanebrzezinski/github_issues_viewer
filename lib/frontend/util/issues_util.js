var $ = require('jQuery');
var ApiActions = require('../actions/api_actions');

issuesUtil = {
  fetchIssues: function(page, cb) {
    page = page || 1;
    $.ajax({
      type: "GET",
      url: "https://api.github.com/repos/npm/npm/issues",
      data: {page: page, access_token: "a86a8326d9a86370b528c653c678c60352023606"},
      dataType: "json",
      success: function(data, textStatus, request) {
        //parse out last page from response
        lastPage = request.getResponseHeader(
          "link").split(" ")[2]
          .split("=")[1]
          .split(">")[0];

        ApiActions.receiveIssues(data);
        cb && cb(page, lastPage);
      }
    });
  },

  fetchComments: function(url, cb) {
    $.ajax({
      type: "GET",
      url: url,
      data: {access_token: "a86a8326d9a86370b528c653c678c60352023606"},
      dataType: "json",
      success: function(data) {
        ApiActions.receiveComments(data);
      }
    });
  }
};

module.exports = issuesUtil;
