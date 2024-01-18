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

function submitForm(formType) {
  const userAndPass = getUserAndPass();
  const reqType = "POST";
  const requestOptions = initializeReqOptions(userAndPass, reqType);

  fetch(`http://localhost:3000/${formType}.html`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function getUserAndPass() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  return { username: username, password: password };
}

function hasEmptyField(username, password) {
  return username === "" || password === "";
}
