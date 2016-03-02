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
    this.setState({page: currentPage, lastPage: parseInt(lastPage)});
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

  jumpToPage: function(e) {
    issuesUtil.fetchIssues(
      parseInt(e.currentTarget.id),
      this.apiCallback
    );
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

      if (this.state.page > 1) {
        pages.push(
          <li onClick={this.prevPage} key="prev" className="page iterator">previous</li>
        );
      }

      for (var i = 0; i < 20 && this.state.page + 20 < this.state.lastPage; i++) {
        var pageNum = this.state.page + i;
        if (pageNum === this.state.page) {
          pages.push(<li className="current page" onClick={this.jumpToPage}
          id={pageNum} key={pageNum}>{pageNum}</li>);
        } else {
          pages.push(<li className="page" onClick={this.jumpToPage}
          id={pageNum} key={pageNum}>{pageNum}</li>);
        }
      }

      if (this.state.page < this.state.lastPage) {
        pages.push(
          <li onClick={this.nextPage} key="next" className="page iterator">next</li>
        );
      }
    }

    return(
      <div>
        <div className="page-list">
          <ul className="pages">{pages}</ul>
        </div>
        <ul className="issues">{issues}</ul>
      </div>
    );
  }
});

module.exports = Index;
