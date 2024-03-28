function initializeReqOptions(raw, reqType) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  raw = JSON.stringify(raw);

  var requestOptions = {
    method: reqType,
    headers: myHeaders,
    redirect: "follow",
  };

  if (reqType === "POST") {
    requestOptions.body = raw;
  }

  return requestOptions;
}

function submitForm(body, formType, reqType) {
  const handleResponse = {
    200: (response) => response.json(),
    201: (_) => {
      if (formType === "create_account") {
        alert("Account successfully created");
      }

      if (formType === "create_discussion") {
        alert("Discussion successfully created");
      }

      if (formType === "create_comment") {
        alert("Comment successfully created");
      }
    },
    401: (_) => {
      if (formType === "login") {
        alert("Incorrect Credentials");
        throw new Error("Incorrect Credentials");
      } else {
        throw new Error("Unauthorized Access");
      }
    },
    409: (_) => {
      if (formType === "create_account") {
        alert("Username Already Taken");
        throw new Error("Username Already Taken");
      } else {
        throw new Error("Failed to fetch data");
      }
    },
    500: (_) => {
      alert("Server Error");
      throw new Error("Server Error");
    },
    default: () => {
      throw new Error("Failed to fetch data");
    },
  };

  const requestOptions = initializeReqOptions(body, reqType);

  fetch(`http://localhost:3000/${formType}`, requestOptions)
    .then((response) => {
      if (response.redirected === true) {
        window.location.href = response.url;
      } else {
        const handler =
          handleResponse[response.status] || handleResponse.default;
        return handler(response);
      }
    })
    .then((data) => {
      console.log("Fecthed Data: ", data);
    })
    .catch((error) => {
      console.error("error", error);
      alert(error);
    });
}
