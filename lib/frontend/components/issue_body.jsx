var React = require('react');
var marked = require('marked');
var findAndReplaceUsername = require('../util/regex_util');

var IssueBody = React.createClass({

  calculatePreview: function(text) {
    var preview;
    if (!this.props.modal) {
      if (text && text.length > 140) {
        preview = text.slice(0, 140);
        if (preview[preview.length - 1] === " ") {
          return preview;
        } else {
          var arr = preview.split(" ");
          preview = arr.slice(0, arr.length - 2).join(" ");
          preview += "...";
        }
      } else {
        preview = text;
      }
    } else {
      preview = text;
    }
    return preview;
  },

  clickHandler: function() {
    this.props.clickHandler(this.props.issue);
  },

  render: function() {
    var issue = this.props.issue;

    var previewText = this.calculatePreview(issue.body);
    previewText = findAndReplaceUsername(previewText);

    var preview;

    if (issue.body && this.props.modal) {
      dangerouslySetInnerHTML = {__html: marked(previewText)};
      preview = <li dangerouslySetInnerHTML={dangerouslySetInnerHTML} className="preview"></li>;
    } else {
      preview = <li className="preview">{previewText}</li>;
    }

    var title = {__html: marked(issue.title)};

    var labels = issue.labels.map(function(label) {
      if (label.color === "FFFFFF") {
        return (
          <li key={label.name} className="label"
          style={{color: "#000"}}
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
    return(
      <div className="issue-body">
        <li key="title" className="title hover" onClick={this.clickHandler}
          dangerouslySetInnerHTML={title}></li>
        <ul key="labels" className="labels">{labels}</ul>
        {preview}
      </div>
    );
  }
});
module.exports = IssueBody;
