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

function handleLogout() {
  var s = { _: "_" };
  submitForm(s, "logout", "POST");
}

function submitComment() {
  var comment = getComment();
  submitForm(comment, "create_comment", "POST");
}
