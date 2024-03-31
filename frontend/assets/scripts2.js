function getUserAndPass() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  return { username: username, password: password };
}

function getTopicAndContent() {
  const discussionTitle = document.getElementById("discussionTopic").value;
  const discussionContent = document.getElementById("discussionContent").value;

  return {
    discussionTopic: discussionTitle,
    discussionContent: discussionContent,
  };
}

function getComment() {
  const comment = document.getElementById("commentInput").value;

  return { comment: comment };
}

function hasEmptyField(username, password) {
  return username === "" || password === "";
}

function createNewDiscussionButtonHandler() {
  window.location.href = "http://localhost:3000/private/create_discussion.html";
}

function openCommentForm(commentFormID) {
  var commentForm = document.getElementById(commentFormID);

  if (commentForm.style.display === "block") {
    commentForm.style.display = "none";
  } else {
    commentForm.style.display = "block";
  }
}

function handleLogout() {
  var s = { _: "_" };
  submitForm(s, "logout", "POST");
}

function submitComment() {
  var comment = getComment();
  submitForm(comment, "create_comment", "POST");
}

function showDiscussions(discussions) {
  for (let i = 0; i < discussions.length; i++) {
    const main = document.getElementById("mainContent");
    const newSection = document.createElement("section");

    const newDiscussionDiv = createDiscussionDiv(discussions[i]);
    newSection.appendChild(newDiscussionDiv);

    const newCommentFormDiv = createCommentFormDiv(discussions[i]);
    newSection.appendChild(newCommentFormDiv);

    main.appendChild(newSection);
  }
}

function createDiscussionDiv(discussion) {
  const newDiscussionDiv = document.createElement("div");
  newDiscussionDiv.className = "discussion";

  const discussionTitle = document.createElement("h2");
  discussionTitle.textContent = discussion.title;
  newDiscussionDiv.appendChild(discussionTitle);

  const discussionContent = document.createElement("p");
  discussionContent.textContent = discussion.content;
  newDiscussionDiv.appendChild(discussionContent);

  const discussionCommentButton = document.createElement("button");
  discussionCommentButton.onclick = function () {
    openCommentForm(discussion.discussion_id);
  };
  discussionCommentButton.textContent = "Comment";
  newDiscussionDiv.appendChild(discussionCommentButton);

  return newDiscussionDiv;
}

function createCommentFormDiv(discussion) {
  const newCommentFormDiv = document.createElement("div");
  newCommentFormDiv.className = "comment-form";
  newCommentFormDiv.id = discussion.discussion_id;

  const newTextArea = document.createElement("textarea");
  newTextArea.id = "commentInput";
  newTextArea.placeholder = "Type your comment here...";
  newCommentFormDiv.appendChild(newTextArea);

  const newSubmitCommentButton = document.createElement("button");
  newSubmitCommentButton.textContent = "Submit Comment";

  newSubmitCommentButton.onclick = submitComment;
  newCommentFormDiv.appendChild(newSubmitCommentButton);
  return newCommentFormDiv;
}
