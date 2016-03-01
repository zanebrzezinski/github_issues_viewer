var React = require('react');
var marked = require('marked');
var issuesJSON = require('./issues');

var IndexItem = require('./indexItem');

var Index = React.createClass({

  render: function() {

    var issues = issuesJSON.map(function(issue) {
      return (
        <IndexItem key={issue.id} issue={issue}/>
      );
    });

    return(
      <ul className="issues">{issues}</ul>
    );
  }
});

module.exports = Index;
