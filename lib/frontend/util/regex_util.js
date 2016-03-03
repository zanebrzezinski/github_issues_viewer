var findAndReplaceUsername = function(text) {
  if (text) {
    var regex = /(^|[^@\w])@(\w{1,39})\b/g;
    var replace = '$1<a href="http://github.com/$2">@$2</a>';
    return text.replace(regex, replace);
  }
};


module.exports = findAndReplaceUsername;
