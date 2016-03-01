var AppDispatcher = require('../dispatcher/dispatcher');
var IssuesStore = require('../stores/issues_store.js');

var ApiActions = {
  receiveIssues: function(issues) {
    AppDispatcher.dispatch({
      actionType: "ISSUES RECEIVED",
      issues: issues
    });
  }
};

module.exports = ApiActions;
