var React = require('react');
var marked = require('marked');
var issuesJSON = require('./issues');


var Index = React.createClass({


  render: function() {

    var issues = issuesJSON.map(function(issue) {
      var labels = issue.labels.map(function(label) {
        return (
          <li key={label.name}><a href={label.url}>{label.name}</a></li>
        );
      });

      var status;
      if (issue.state === "open") {
        status = <i className="fa fa-exclamation-circle"></i>;
      } else {
        status = <i className="fa fa-check-circle-o"></i>;
      }

      var preview = {__html: marked(issue.body.slice(0,140))};
      var title = {__html: marked(issue.title)};

      return(
        <ul key={issue.id} className="issue">
          <li key="avatar" className="avatar"><img src={issue.user.avatar_url}/></li>
          <li key="username">{issue.user.login}</li>
          <li key="status">{status}</li>
          <li key="id">{issue.id}</li>
          <li key="title" dangerouslySetInnerHTML={title}></li>
          <ul key="labels">{labels}</ul>
          <li dangerouslySetInnerHTML={preview}></li>
          <li key="numComments">{issue.comments}</li>
        </ul>
      );
    });

    return(
      <ul className="issues">{issues}</ul>
    );
  }
});

module.exports = Index;
