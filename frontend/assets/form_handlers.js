function handleLogout() {
  var s = { _: "_" };
  submitForm(s, "logout", "POST");
}

function handleLogin() {
  const userAndPass = getUserAndPass();
  res = submitForm(userAndPass, "login", "POST");
}

function handleCreateAccount() {
  const userAndPass = getUserAndPass();
  submitForm(userAndPass, "create_account", "POST");
}

function submitComment(event) {
  console.log(event.target.id);
}

function handleSubmitDiscussion() {
  const discussionJSONBody = getTopicAndContent();
  submitForm(discussionJSONBody, "create_discussion", "POST");
}

function handleRefresh() {
  try {
    const body = "";
    const formType = "get_discussion";
    const reqType = "GET";
    submitForm(body, formType, reqType).then((data) => {
      showDiscussions(data);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
