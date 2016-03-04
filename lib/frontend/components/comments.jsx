var React = require('react');
var CommentsStore = require('../stores/comments_store');
var issuesUtil = require('../util/issues_util.js');
var marked = require('marked');
var findAndReplaceUsername = require('../util/regex_util');

var Comments = React.createClass({

  getInitialState: function() {
    return({comments: null, error: null});
  },

  componentDidMount: function() {
    this.token = CommentsStore.addListener(this._onChange);
    issuesUtil.fetchComments(this.props.url, this.errorCallback);
  },

  errorCallback: function() {
    this.setState({error: "Oh no, something seems to have gone wrong. You've probably made too many unauthenticated requests. See the readme for details."});
  },

  componentWillUnmount: function() {
    this.token.remove();
  },

  _onChange: function() {
    this.setState({comments: CommentsStore.comments()});
  },

  render: function() {

    if (this.state.error) {
      return (<h2>{this.state.error}</h2>);
    }

    var comments;
    if (this.state.comments) {
      comments = this.state.comments.map(function(comment) {
        var bodyText = findAndReplaceUsername(comment.body);
        bodyText = marked(bodyText);
        var body = {__html: bodyText};
        return(
          <li key={comment.id} className="comment group">
            <div className="issue-info">
              <a href={"https://github.com/" + comment.user.login}>
                <img key="avatar" className="avatar" src={comment.user.avatar_url}/>
                <div key="username" className="username">
                  {"@" + comment.user.login}
                </div>
              </a>
            </div>
            <div key="comment" className="body" dangerouslySetInnerHTML={body}></div>
          </li>
        );
      });
    }

    return(
      <ul className="comments">
        {comments}
      </ul>
    );
  }

});

module.exports = Comments;
