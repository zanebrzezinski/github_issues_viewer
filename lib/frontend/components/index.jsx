var React = require('react');
var marked = require('marked');
var issuesJSON = require('./issues');


var Index = React.createClass({


  render: function() {

    var issues = issuesJSON.map(function(issue) {
      return(
        <li key={issue.id}>
          <div key="username">{issue.user.login}</div>
          <div key="issue">{issue.title}</div>
        </li>
      );
    });

    return(
      <ul>{issues}</ul>
    );
  }
});

module.exports = Index;
