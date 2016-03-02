var React = require('react');
var marked = require('marked');
var issuesJSON = require('./issues');
var issuesUtil = require('../util/issues_util.js');
var IssuesStore = require('../stores/issues_store');

var IndexItem = require('./indexItem');

var Index = React.createClass({

  getInitialState: function() {
    return ({issues: null, page: 1, lastPage: null});
  },

  apiCallback: function(currentPage, lastPage) {
    this.setState({page: currentPage, lastPage: lastPage});
  },

  prevPage: function() {
    if (this.state.page > 1) {
      issuesUtil.fetchIssues(this.state.page - 1, this.apiCallback);
    }
  },

  nextPage: function() {
    if (this.state.page === null || this.state.page < this.state.lastPage) {
      issuesUtil.fetchIssues(
        this.state.page + 1,
        this.apiCallback
      );
    }
  },

  componentDidMount: function() {
    this.token = IssuesStore.addListener(this._onChange);
    issuesUtil.fetchIssues(this.state.page, this.apiCallback);
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

    var pages = [];
    if (this.state.lastPage) {
      for (var i = 0; i < this.state.lastPage; i++) {
        if (i === this.state.page) {
          pages.push(<p className="current page" key={i}>{i + 1}</p>);
        } else {
          pages.push(<p className="page" key={i}>{i + 1}</p>);
        }
      }
    }

    return(
      <div>
        <p onClick={this.prevPage}>prev</p>
        {pages}
        <p onClick={this.nextPage}>next</p>
        <ul className="issues">{issues}</ul>
      </div>
    );
  }
});

module.exports = Index;
