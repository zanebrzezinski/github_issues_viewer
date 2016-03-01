var React = require('react');
var marked = require('marked');
var issues = require('./issues');


var Index = React.createClass({

  render: function() {

    





    var issues2 = issues;
    return(
      <div
        className="content"
        dangerouslySetInnerHTML={this.rawMarkup()}
      />
    );
  }
});

module.exports = Index;
