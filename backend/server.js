const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sessionMiddleware = require("./middlewares/redis-session");
const { isAuthenticated, authenticate, logout } = require("./middlewares/auth");
const createAccount = require("./middlewares/create_account");
const { Pool } = require("pg");

const app = express();
const port = 3000;

require("dotenv").config();

const password = process.env.DB_PASSWORD;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Discussion Database",
  password: password,
  port: 5432,
});

app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use("/login.html", authenticate(pool));
app.use("/create_account.html", createAccount(pool));
app.use("/logout.html", logout);
app.use("/public", express.static(path.join(__dirname, "../frontend/public")));
app.use(
  "/private",
  isAuthenticated,
  express.static(path.join(__dirname, "../frontend/private"))
);

// Main GET handler
app.get("/", (req, res) => {
  res.redirect("/public/login.html");
});

// Login POST handler
app.post("/login.html", async (req, res) => {
  // Redirect to home IF authorized
  res.redirect("/private/home.html");
});

app.post("/logout.html", async (req, res) => {
  res.redirect("/public/login.html");
});

// Create Account POST handler
app.post("/create_account.html", (req, res) => {
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
