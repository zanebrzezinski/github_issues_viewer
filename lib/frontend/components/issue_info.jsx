var React = require('react');

var IssueInfo = React.createClass({
  render: function() {

    var issue = this.props.issue;

    var status;
    if (issue.state === "open") {
      status = <i className="fa fa-exclamation open-issue">Open</i>;
    } else {
      status = <i className="fa fa-check-circle-o closed-issue">Closed</i>;
    }

    return(
      <div className="issue-info">
        <div key="status" className="status">{status}</div>
        <div key="id" className="id hover" onClick={this.props.clickHandler}>
          {"#"+issue.id}</div>
        <a href={"https://github.com/" + issue.user.login}>
          <img key="avatar" className="avatar" src={issue.user.avatar_url}/>
          <div key="username" className="username hover">
            {"@" + issue.user.login}
          </div>
        </a>
      </div>
    );
  }
});

module.exports = IssueInfo;
