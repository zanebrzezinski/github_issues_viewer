# Github Issues Viewer
### It's a thing for viewing issues on github.

To run, clone this repo and run `npm install` and open 'index.html' in browser.

Or view live [here](http://issuesviewer.zanebrzezinski.com)

Because this is a frontend only project, there is currently no UI to authenticate
the API requests to github.  The access token may be hard-coded in
`lib/frontend/util/issues_util` by adding a `data` key to the ajax request as follows:

```$.ajax({
  type: "GET",
  url: "https://api.github.com/repos/npm/npm/issues",
  data: {page: page, access_token: "ACCESS TOKEN GOES HERE" },
  dataType: "json",
  success: function(data, textStatus, request) {
    //parse out last page number from response
    lastPage = request.getResponseHeader(
      "link").split(" ")[2]
      .split("=")[1]
      .split(">")[0];

    ApiActions.receiveIssues(data);
    cb && cb(page, lastPage);
  },
  ```

or in the comments request like so:

```
fetchComments: function(url, cb) {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    data: {access_token: "ACCESS TOKEN GOES HERE"}
    success: function(data) {
      ApiActions.receiveComments(data);
    }
  });
}
```

# Features
 * Uses Github API to grab issues from npm repo.
 * Github API is automatically paginated, so there are controls at the top and
 bottom of the issues list to navigate through the list of issues.
 * Renders first 140 characters of issue-body on index page.  Renders full text in show modal.
 * On click of title, comments, or issue number, will display a modal with full issue and list
 of comments.
 * Fetches comments using "comment_url" returned from API response for single issue
 * Renders markdown using [chjj's marked parser](https://github.com/chjj/marked)
 * Lists labels for each issue, with color of label determined by hex code sent up
 with Api.
    * White labels are rendered slightly darker, as label text is set to white and is
 otherwise illegible.
 * Uses regex to parse out @mentions and link to github user profile.

#To Do
  * No back end means no oAuth means limited Api Requests per hour.
  * History.  Would involve refactoring index component to fetch page by taking pagenum from
  history hash, which would allow using browser history to navigate through visited pages.
  * In one instance, dangerouslysetinnerhtml has disastrous results. Page 10 is
  the only page that will not load
