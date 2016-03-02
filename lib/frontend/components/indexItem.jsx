var React = require('react');
var marked = require('marked');
var issuesJSON = require('./issues');

var IndexItem = React.createClass ({
  render: function () {
    var issue = this.props.issue;
    var labels = issue.labels.map(function(label) {
      if (label.color === "FFFFFF") {
        return (
          <li key={label.name} className="label"
          style={{color: "#000000"}}
          ><a href={label.url}>{label.name}</a></li>
        );
      } else {
        return (
          <li key={label.name} className="label"
          style={{backgroundColor: "#" + label.color}}
          ><a href={label.url}>{label.name}</a></li>
        );
      }
    });

    var status;
    if (issue.state === "open") {
      status = <i className="fa fa-exclamation open-issue">Open</i>;
    } else {
      status = <i className="fa fa-check-circle-o closed-issue">Closed</i>;
    }

    var previewText;
    if (issue.body.length > 140) {
      previewText = issue.body.slice(0,140) + "...";
    } else {
      previewText = issue.body.slice(0,140);
    }
    var preview = {__html: marked(previewText)};

    return(
      <li className="issue-block">
        <ul key={issue.id} className="issue group">
          <div className="issue-info">
            <div key="status" className="status">{status}</div>
            <div key="id" className="id">{"#"+issue.id}</div>
            <a href={"https://github.com/" + issue.user.login}>
              <img key="avatar" className="avatar" src={issue.user.avatar_url}/>
              <div key="username" className="username">
                {"@" + issue.user.login}
              </div>
            </a>
          </div>
          <li key="title" className="title">{issue.title}</li>
          <ul key="labels">{labels}</ul>
          <li dangerouslySetInnerHTML={preview} className="preview"></li>
          <li key="numComments" className="numComments">
            <i className="fa fa-comment-o"></i> {issue.comments + " comments"}
          </li>
        </ul>
      </li>
    );
  }
});

module.exports = IndexItem;
