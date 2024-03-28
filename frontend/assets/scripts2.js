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

function openCommentForm() {
  var commentForm = document.querySelector(".comment-form");

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

function showDiscussions() {
  const main = document.getElementById("mainContent");
  const newSection = document.createElement("section");

  const newDiscussionDiv = createDiscussionDiv();
  newSection.appendChild(newDiscussionDiv);

  const newOpenFormDiv = createOpenFormDiv();
  newSection.appendChild(newOpenFormDiv);

  main.appendChild(newSection);
}

function createDiscussionDiv() {
  const newDiscussionDiv = document.createElement("div");
  newDiscussionDiv.className = "discussion";

  const discussionTitle = document.createElement("h2");
  discussionTitle.textContent = "TEST";
  newDiscussionDiv.appendChild(discussionTitle);

  const discussionContent = document.createElement("p");
  discussionContent.textContent = "TEST";
  newDiscussionDiv.appendChild(discussionContent);

  const discussionCommentButton = document.createElement("button");
  discussionCommentButton.textContent = "Comment";
  newDiscussionDiv.appendChild(discussionCommentButton);

  return newDiscussionDiv;
}

function createOpenFormDiv() {
  const newOpenFormDiv = document.createElement("div");
  newOpenFormDiv.className = "comment-form";

  const newTextArea = document.createElement("textarea");
  newTextArea.id = "commentInput";
  newTextArea.placeholder = "Type your comment here...";
  newOpenFormDiv.appendChild(newTextArea);

  const newSubmitCommentButton = document.createElement("button");
  newSubmitCommentButton.textContent = "Submit Comment";
  newSubmitCommentButton.onclick = openCommentForm;
  newOpenFormDiv.appendChild(newSubmitCommentButton);
  console.log("IM HERE");
  return newOpenFormDiv;
}
