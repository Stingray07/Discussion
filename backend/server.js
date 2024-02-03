const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { authPass, hashPassword } = require("./auth_ops");
const { insertAccountCred, selectAccountCred } = require("./db_ops");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 3000;
const password = process.env.DB_PASSWORD;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Discussion Database",
  password: password,
  port: 5432,
});

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

// main handler
app.get("/", (req, res) => {
  res.redirect("/home.html");
});

// login handler
app.post("/login.html", (req, res) => {
  console.log(
    `LOGIN POST: username=${req.body.username}; password=${req.body.password}`
  );

  // function for checking username in DB
  selectAccountCred(req.body.username, pool, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      if (res) {
        authPass(
          res.acc_password,
          req.body.password,
          res.pass_salt,
          (err, auth_res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(auth_res);
              //..
            }
          }
        );
      } else {
        console.log("USERNAME NOT FOUND");
      }
    }
  });

  res.redirect("/home.html");
});

// create account handler
app.post("/create_account.html", (req, res) => {
  hashPassword(req.body.password, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      const accountObject = {
        username: req.body.username,
        password: res.hash,
        salt: res.salt,
      };

      insertAccountCred(accountObject, pool);
    }
  });

  var body = {
    username: req.body.username,
    stat: "Account Created",
  };
  res.json(body);
});

// create discussion handler
app.post("/create_discussion.html", (req, res) => {
  console.log(
    `CREATE DISCUSSION: topic=${req.body.discussionTopic}; content=${req.body.discussionContent}`
  );
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
