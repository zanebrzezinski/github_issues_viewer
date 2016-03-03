var React = require('react');
var marked = require('marked');

var IndexItem = React.createClass ({

  clickHandler: function() {
    this.props.clickHandler(this.props.issue);
  },

  calculatePreview: function(text) {
    var preview = text.slice(0, 140);
    if (preview[preview.length - 1] === " ") {
      return preview;
    } else {
      var arr = preview.split(" ");
      preview = arr.slice(0, arr.length - 2).join(" ");
      preview += "...";
    }
    return preview;
  },

  render: function () {
    var issue = this.props.issue;
    var labels = issue.labels.map(function(label) {
      if (label.color === "FFFFFF") {
        return (
          <li key={label.name} className="label"
          style={{color: "#000000"}}
          >{label.name}</li>
        );
      } else {
        return (
          <li key={label.name} className="label"
          style={{backgroundColor: "#" + label.color}}
          >{label.name}</li>
        );
      }
    });

    var status;
    if (issue.state === "open") {
      status = <i className="fa fa-exclamation open-issue">Open</i>;
    } else {
      status = <i className="fa fa-check-circle-o closed-issue">Closed</i>;
    }

    var previewText;
    if (!this.props.modal) {
      if (issue.body.length > 140) {
        previewText = this.calculatePreview(issue.body);
      } else {
        previewText = issue.body;
      }
    } else {
      previewText = issue.body;
    }
    var preview = {__html: marked(previewText)};

    var title = {__html: marked(issue.title)};


    if (!this.props.modal) {
      return(
        <li className="issue-block">
          <ul key={issue.id} className="issue group">
            <div className="issue-info">
              <div key="status" className="status">{status}</div>
              <div key="id" className="id" onClick={this.clickHandler}>
                {"#"+issue.id}</div>
              <a href={"https://github.com/" + issue.user.login}>
                <img key="avatar" className="avatar" src={issue.user.avatar_url}/>
                <div key="username" className="username">
                  {"@" + issue.user.login}
                </div>
              </a>
            </div>
            <div className="issue-body">
              <li key="title" className="title" onClick={this.clickHandler}
                dangerouslySetInnerHTML={title}></li>
              <ul key="labels">{labels}</ul>
              <li dangerouslySetInnerHTML={preview} className="preview"></li>
            </div>
            <li key="numComments" className="numComments"
              onClick={this.clickHandler}>
              <i className="fa fa-comment-o"></i> {issue.comments + " comments"}
            </li>
          </ul>
        </li>
      );
    } else {
      return(
        <li className="issue-block no-hover">
          <ul key={issue.id} className="issue group">
            <div className="issue-info">
              <div key="status" className="status">{status}</div>
              <div key="id" className="id" onClick={this.clickHandler}>
                {"#"+issue.id}</div>
              <a href={"https://github.com/" + issue.user.login}>
                <img key="avatar" className="avatar" src={issue.user.avatar_url}/>
                <div key="username" className="username">
                  {"@" + issue.user.login}
                </div>
              </a>
            </div>
            <div className="issue-body">
              <li key="title" className="title" onClick={this.clickHandler}>
                {issue.title}</li>
              <ul key="labels">{labels}</ul>
              <li dangerouslySetInnerHTML={preview} className="preview"></li>
            </div>
          </ul>
        </li>
      );
    }


  }
});

module.exports = IndexItem;
