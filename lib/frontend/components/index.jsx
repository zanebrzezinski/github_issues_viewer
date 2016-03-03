var React = require('react');
var issuesUtil = require('../util/issues_util.js');
var IssuesStore = require('../stores/issues_store');

var IndexItem = require('./indexItem');
var IssueModal = require('./issue_modal');

var Index = React.createClass({

  getInitialState: function() {
    return ({issues: null, page: 1, lastPage: null, modal: null});
  },

  apiCallback: function(currentPage, lastPage) {
    if (this.state.lastPage) {
      this.setState({page: currentPage});
    } else {
      this.setState({page: currentPage, lastPage: parseInt(lastPage)});
    }
  },

  showModal: function(issue) {
    this.setState({modal: issue});
  },

  hideModal: function() {
    this.setState({modal: null});
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

  componentWillUnmount: function() {
    this.token.remove();
  },

  _onChange: function() {
    this.setState({issues: IssuesStore.issues()});
  },

  render: function() {
    var issues;
    if (this.state.issues) {
      issues = this.state.issues.map(function(issue) {
        return (
          <IndexItem key={issue.id} issue={issue} clickHandler={this.showModal}/>
        );
      }.bind(this));
    }

    var pages = [];
    if (this.state.lastPage) {

      if (this.state.page > 1) {
        pages.push(
          <li onClick={this.prevPage} key="prev" className="page iterator">&#60;</li>
        );
      }

      var i;
      if (i < 5) {
        i = 0;
      } else if (this.state.page + 15 >= this.state.lastPage) {
        i = this.state.lastPage - 15;
      } else {
        i = this.state.page;
      }

      var max = i + 15;
      for (i; i <= max; i++) {
        if (i === this.state.page) {
          pages.push(<li className="current page" onClick={this.jumpToPage}
          id={i} key={i}>{i}</li>);
        } else {
          pages.push(<li className="page" onClick={this.jumpToPage}
          id={i} key={i}>{i}</li>);
        }
      }

      if (this.state.page < this.state.lastPage) {
        pages.push(
          <li onClick={this.nextPage} key="next" className="page iterator">&#62;</li>
        );
      }
    }
    content = (
      <div>
        <div className="page-list">
          <ul className="pages">{pages}</ul>
        </div>
        <ul className="issues">{issues}</ul>
        <div className="page-list">
          <ul className="pages">{pages}</ul>
        </div>
      </div>
    );

    if (this.state.modal) {
      return(
        <div>
          <IssueModal hideModal={this.hideModal} issue={this.state.modal}/>
          {content}
        </div>
      );
    } else {
      return content;
    }

  }
});

module.exports = Index;
