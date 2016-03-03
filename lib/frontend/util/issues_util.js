var $ = require('jQuery');
var ApiActions = require('../actions/api_actions');

issuesUtil = {
  fetchIssues: function(page, cb) {
    page = page || 1;
    $.ajax({
      type: "GET",
      url: "https://api.github.com/repos/npm/npm/issues",
      data: {page: page, access_token: "46625b4245fc6602a77398dd804f1652986cab41"},
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
      data: {access_token: "46625b4245fc6602a77398dd804f1652986cab41"},
      dataType: "json",
      success: function(data) {
        ApiActions.receiveComments(data);
      }
    });
  }
};

module.exports = issuesUtil;
