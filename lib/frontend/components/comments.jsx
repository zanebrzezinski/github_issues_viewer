var React = require('react');
var CommentsStore = require('../stores/comments_store');
var issuesUtil = require('../util/issues_util.js');

var Comments = React.createClass({

  getInitialState: function() {
    return({comments: null});
  },

  componentDidMount: function() {
    this.token = CommentsStore.addListener(this._onChange);
    issuesUtil.fetchComments(this.props.url);
  },

  _onChange: function() {
    debugger
    this.setState({comments: CommentsStore.comments()});
  },

  render: function() {
    return(<div/>);
  }

});

module.exports = Comments;
