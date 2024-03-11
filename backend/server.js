const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sessionMiddleware = require("./middlewares/redis_session");
const { isAuthenticated, authenticate, logout } = require("./middlewares/auth");
const createDiscussion = require("./middlewares/create_discussion");
const createAccount = require("./middlewares/create_account");
const pool = require("./services/pool");

const app = express();
const port = 3000;

app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use("/login.html", authenticate(pool));
app.use("/create_account.html", createAccount(pool));
app.use("/create_discussion.html", createDiscussion(pool));
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
  res.redirect("/private/home.html");
});

// Logout POST handler
app.post("/logout.html", async (req, res) => {
  res.redirect("/public/login.html");
});

// Create Account POST handler
app.post("/create_account.html", (req, res) => {
  res.status(201).send("Account Created"); // Can also send json
});

// Create Discussion POST handler
app.post("/create_discussion.html", (req, res) => {
  res.status(201).send("Discussion Created");
});

// Create Comment POST handler
app.post("/create_comment", (req, res) => {
  console.log(req.body.comment);
  res.send(req.body.comment);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
