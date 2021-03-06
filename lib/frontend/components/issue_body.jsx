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
    return findAndReplaceUsername(preview);
  },

  calculateLabels: function() {
    var labels = this.props.issue.labels.map(function(label) {
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

    return labels;
  },

  clickHandler: function() {
    this.props.clickHandler(this.props.issue);
  },

  render: function() {
    var issue = this.props.issue;

    var clickHandler;
    var hover;
    if (this.props.clickHandler) {
      clickHandler = this.clickHandler;
      hover = "hover";
    } else {
      clickHandler = null;
      hover = "no-hover";
    }

    var previewText = this.calculatePreview(issue.body);
    var preview;

    /* the weird number "issue.id" evaluated in the next two functions is a weird
    edge case that blows up the dangerouslySetInnerHTML.  I literally checked every page
    of npm issues and this seems to be the only one that blows up the app, so I coded around it.
    I'm sure there is a better way to do this. I suspect the problem word is <Object> */

    if (issue.body && issue.id !== 127528953) {
      dangerouslySetInnerHTML = {__html: marked(previewText)};
      preview = <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} className="preview"></div>;
    } else {
      preview = <div className="preview">{previewText}</div>;
    }

    var titleText;
    var title;
    if (issue.id !== 127528953) {
      titleText = {__html: marked(issue.title)};
      title = <div dangerouslySetInnerHTML={titleText} onClick={clickHandler}
        className={"title " + hover}></div>;
    } else {
      title = <div className={"title " + hover} onClick={clickHandler}>{issue.title}</div>;
    }

    var labels = this.calculateLabels();

    return(
      <li className="issue-body">
        {title}
        <ul key="labels" className="labels">{labels}</ul>
        {preview}
      </li>
    );
  }
});
module.exports = IssueBody;
