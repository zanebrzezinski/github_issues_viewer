# Github Issues Viewer
### It's a thing for viewing issues on github.

To run, clone this repo and run `npm install` and open 'index.html' in browser.

or view live [here](https://issuesviewer.zanebrzezinski.com)

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
  * Markdown parsing on preview text is imperfect.  When the 140 character limit ends
  in the middle of a code block, the backtick(s) will remain and will not be rendered as
  code block.
  * Back end for oAuth.  Github limits unauthenticated API requests to 60 per hour.
  I got around this in testing by hard coding a personal access token, but in production
  the app would need to keep track of a logged in user and use their access token to
  authenticate the request.  A rather easy fix, but felt out of the scope of this project.
  * Input field to look at issues for other repos.  Again, rather trivial to implement,
  just need to grab the contents of the field and configure the ajax request url accordingly.
  * "Time Ago" stamps for comment and issue submissions.  Could have used a library, but would
  rather write the code out myself as it's pretty simple to accomplish.
  * History.  Would involve refactoring index component to fetch page by taking pagenum from
  history hash, which would allow using browser history to navigate through visited pages.
  * Styling.  Always styling.  In spending so much time looking at githubs issues pages,
  I've somewhat aped their droll styling.  Needs some more spice at the moment.
  * Errors.  Some are implemented, but one can never underestimate the end-user's
  ability to screw me up.  Of course, as more features are added, so too is the possibility
  for more errors.
