var React = require('react');
var marked = require('marked');

var IssueInfo = require('./issue_info');
var IssueBody = require('./issue_body');

var IndexItem = React.createClass ({

  render: function () {
    var issue = this.props.issue;

    if (!this.props.modal) {
      return(
        <li className="issue-block">
          <ul key={issue.id} className="issue group">
            <IssueInfo issue={this.props.issue} clickHandler={this.props.clickHandler}/>
            <IssueBody issue={this.props.issue}
              clickHandler={this.props.clickHandler} modal={this.props.modal}/>
            <li key="numComments" className="numComments hover"
              onClick={this.clickHandler}>
              <i className="fa fa-comment-o hover"></i> {issue.comments + " comments"}
            </li>
          </ul>
        </li>
      );
    } else {
    //   return(
    //     <li className="issue-block no-hover">
    //       <ul key={issue.id} className="issue group">
    //         <IssueInfo issue={this.props.issue} clickHandler={null}/>
    //         <div className="issue-body">
    //           <li key="title" className="title" dangerouslySetInnerHTML={title}></li>
    //           <ul key="labels" className="labels">{labels}</ul>
    //           <li dangerouslySetInnerHTML={preview} className="preview"></li>
    //         </div>
    //       </ul>
    //     </li>
    //   );
    }


  }
});

module.exports = IndexItem;
