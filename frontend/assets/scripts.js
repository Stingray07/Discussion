function initializeReqOptions(raw, reqType) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  raw = JSON.stringify(raw);

  var requestOptions = {
    method: reqType,
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return requestOptions;
}

function submitForm(body, formType) {
  const reqType = "POST";
  const requestOptions = initializeReqOptions(body, reqType);

  fetch(`http://localhost:3000/${formType}.html`, requestOptions)
    .then((response) => {
      if (response.redirected === true) {
        window.location.href = response.url;
      } else if (response.status === 200) {
        return response.json();
      } else if (response.status === 401 && formType === "login") {
        alert("Incorrect Credentials");
        throw new Error("Incorrect Credentials");
      } else if (response.status === 401) {
        throw new Error("Unauthorized Access");
      } else if (response.status === 409 && formType === "create_account") {
        alert("Username Already Taken");
        throw new Error("Username Already Taken");
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .then((data) => {
      console.log("Fecthed Data: ", data);
    })
    .catch((error) => console.error("error", error));
}

function getUserAndPass() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  return { username: username, password: password };
}

function getTopicAndContent() {
  const discussionTopic = document.getElementById("discussionTopic").value;
  const discussionContent = document.getElementById("discussionContent").value;

  return {
    discussionTopic: discussionTopic,
    discussionContent: discussionContent,
  };
}

function hasEmptyField(username, password) {
  return username === "" || password === "";
}

function createNewDiscussionButtonHandler() {
  window.location.href = "http://localhost:3000/private/create_discussion.html";
}

function incorrectCredentialsHandler() {
  alert("Incorrect Credentials");
}
