var React = require('react');
var marked = require('marked');

var IssueInfo = require('./issue_info');
var IssueBody = require('./issue_body');

var IndexItem = React.createClass ({

  clickHandler: function() {
    this.props.clickHandler(this.props.issue);
  },

  render: function () {
    var issue = this.props.issue;

    return(
      <li className="issue-block">
        <ul key={issue.id} className="issue group">
          <IssueInfo issue={this.props.issue} clickHandler={this.props.clickHandler}/>
          <IssueBody issue={this.props.issue}
            clickHandler={this.props.clickHandler} modal={this.props.modal}/>
          <li key="numComments" className="numComments hover"
            onClick={this.clickHandler}>
            <i className="fa fa-comment-o hover"> {issue.comments + " comments"}</i>
          </li>
        </ul>
      </li>
    );
  }
});

module.exports = IndexItem;
