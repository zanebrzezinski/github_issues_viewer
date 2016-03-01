var React = require('react');
var marked = require('marked');
var issuesJSON = require('./issues');
var issuesUtil = require('../util/issues_util.js');
var IssuesStore = require('../stores/issues_store');

var IndexItem = require('./indexItem');

var Index = React.createClass({

  getInitialState: function() {
    return ({issues: null});
  },

  componentDidMount: function() {
    this.token = IssuesStore.addListener(this._onChange);
    issuesUtil.fetchIssues();
  },

  _onChange: function() {
    this.setState({issues: IssuesStore.issues()});
  },

  render: function() {
    var issues;
    if (this.state.issues) {
      issues = this.state.issues.map(function(issue) {
        return (
          <IndexItem key={issue.id} issue={issue}/>
        );
      });
    }


    return(
      <ul className="issues">{issues}</ul>
    );
  }
});

module.exports = Index;
