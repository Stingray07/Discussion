function submitLoginForm() {
  // Add your login logic here
  alert("Login logic to be implemented");
}

function showCreateAccount() {
  document.getElementById("createAccountForm").style.display = "block";
}

function createAccount() {
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  if (hasEmptyField(newUsername, newPassword)) {
    alert("Fields should not be empty.");
    return;
  }

  console.log("New Username:", newUsername);
  console.log("New Password:", newPassword);
  alert("Account creation logic to be implemented");
}

function hasEmptyField(username, password) {
  return username === "" || password === "";
}
