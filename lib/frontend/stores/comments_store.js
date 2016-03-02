var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CommentsStore = new Store(AppDispatcher);

var _comments = [];

var resetComments = function(comments) {
  _comments = comments;
};

CommentsStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "COMMENTS RECEIVED":
      resetComments(payload.comments);
      CommentsStore.__emitChange();
      break;
  }
};

CommentsStore.comments = function() {
  return _comments.slice(0);
};

module.exports = CommentsStore;
