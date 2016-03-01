var $ = require('jQuery');
var ApiActions = require('../actions/api_actions');

issuesUtil = {
  fetchIssues: function(page) {
    page = page || 1;
    $.ajax({
      type: "GET",
      url: "https://api.github.com/repos/npm/npm/issues",
      dataType: "json",
      success: function(data) {
        ApiActions.receiveIssues(data);
      }
    });
  }
};

module.exports = issuesUtil;
