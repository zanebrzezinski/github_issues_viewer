var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var IssuesStore = new Store(AppDispatcher);

var _issues = [];

var resetIssues = function(issues) {
  _issues = issues;
};

IssuesStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "ISSUES RECEIVED":
      resetIssues(payload.issues);
      IssuesStore.__emitChange();
      break;
  }
};

IssuesStore.issues = function() {
  return _issues.slice(0);
};

module.exports = IssuesStore;
