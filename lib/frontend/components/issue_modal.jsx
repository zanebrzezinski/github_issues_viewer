var React = require('react');

var IndexItem = require('./indexItem');
var Comments = require('./comments');

var IssueModal = React.createClass({
  render: function(){
    return(
      <div>
        <div className="modal-cover" onClick={this.props.hideModal}/>
        <div className="modal">
          <IndexItem className="modal-issue" issue={this.props.issue} modal={true}/>
          <Comments url={this.props.issue.comments_url}/>
        </div>
      </div>
    );
  }
});

module.exports = IssueModal;
