const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { authUser, hashPassword } = require("./auth_ops");
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

// Main GET handler
app.get("/", (req, res) => {
  res.redirect("/home.html");
});

// Login POST handler
app.post("/login.html", async (req, res) => {
  try {
    authUser(req.body, pool).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.error("Error in login post handler:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Create Account POST handler
app.post("/create_account.html", (req, res) => {
  hashPassword(req.body.password, async (err, res) => {
    if (err) {
      console.log(err);
    } else {
      const accountObject = {
        username: req.body.username,
        password: res.hash,
        salt: res.salt,
      };

      const insertion_res = await insertAccountCred(accountObject, pool);
      console.log(insertion_res);
    }
  });

  var body = {
    username: req.body.username,
    stat: "Account Created",
  };
  res.json(body);
});

// Create Discussion POST handler
app.post("/create_discussion.html", (req, res) => {
  console.log(
    `CREATE DISCUSSION: topic=${req.body.discussionTopic}; content=${req.body.discussionContent}`
  );
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
