# Github Issues Viewer
## It's a thing for viewing issues on github.

To run, clone this repo and run `npm install`

or view live [here](issuesviewer.zanebrzezinski.com)

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
 ⋅⋅* White labels are rendered slightly darker, as label text is set to white and is
 illegible otherwise.

#To Do
  * Markdown parsing on preview text is imperfect.  When the 140 character limit ends
  in the middle
