var React = require('react');
var marked = require('marked');
var issuesJSON = require('./issues');

var Index = React.createClass({


  render: function() {

    var issues = issuesJSON.map(function(issue) {
      var labels = issue.labels.map(function(label) {
        return (
          <li key={label.name} className="label"><a href={label.url}>{label.name}</a></li>
        );
      });

      var status;
      if (issue.state === "open") {
        status = <i className="fa fa-exclamation open-issue">Open</i>;
      } else {
        status = <i className="fa fa-check-circle-o closed-issue">Closed</i>;
      }

      var preview = {__html: marked(issue.body.slice(0,140))};

      return(
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
          <li dangerouslySetInnerHTML={preview}></li>
          <li key="numComments" className="numComments">{issue.comments + " comments"}</li>
        </ul>
      );
    });

    return(
      <ul className="issues">{issues}</ul>
    );
  }
});

module.exports = Index;
