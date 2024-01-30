const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { authPass } = require("./auth");

const app = express();
const port = 3000;

app.use(express.static("frontend"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "shhhh, very secret",
  })
);

app.get("/home.html", (req, res) => {
  res.send("Hello World");
});

app.get("/", (req, res) => {
  res.redirect("/home.html");
});

app.post("/login.html", (req, res) => {
  console.log(
    `LOGIN POST: username=${req.body.username}; password=${req.body.password}`
  );

  // function for checking username in DB

  // function for getting hashed password from username in DB

  // auth password
  authPass(hashedPassword, req.body.password, "test", function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

  res.redirect("/home.html");
});

app.post("/create_account.html", (req, res) => {
  console.log(
    `CREATE ACCOUNT POST: username=${req.body.username}; password=${req.body.password}`
  );
  var body = {
    username: req.body.username,
    stat: "Account Created",
  };
  res.json(body);
});

app.post("/create_discussion.html", (req, res) => {
  console.log(
    `CREATE DISCUSSION: topic=${req.body.discussionTopic}; content=${req.body.discussionContent}`
  );
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
