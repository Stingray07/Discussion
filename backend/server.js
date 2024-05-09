const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sessionMiddleware = require("./middlewares/redis_session");
const { isAuthenticated, authenticate, logout } = require("./middlewares/auth");
const createDiscussion = require("./middlewares/create_discussion");
const createAccount = require("./middlewares/create_account");
const getDiscussion = require("./middlewares/get_discussion");
const createComment = require("./middlewares/create_comment");
const pool = require("./services/pool");

const app = express();
const port = 3000;

app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use("/login", authenticate(pool));
app.use("/create_account", createAccount(pool));
app.use("/create_discussion", createDiscussion(pool));
app.use("/get_discussion", isAuthenticated, getDiscussion(pool));
app.use("/create_comment", isAuthenticated, createComment(pool));
app.use("/logout", logout);
app.use("/public", express.static(path.join(__dirname, "../frontend/public")));
app.use(
  "/private",
  isAuthenticated,
  express.static(path.join(__dirname, "../frontend/private"))
);

app.get("/", (req, res) => {
  res.redirect("/public/login.html");
});

app.post("/login", async (req, res) => {
  res.redirect("/private/home.html");
});

app.post("/logout", async (req, res) => {
  res.redirect("/public/login.html");
});

app.post("/create_account", (req, res) => {
  res.status(201).send("Account Created");
});

app.post("/create_discussion", (req, res) => {
  res.status(201).send("Discussion Created");
});

app.post("/create_comment", (req, res) => {
  res.status(201).send("Comment Created");
});

app.get("/get_discussion", (req, res) => {
  res.status(200).send(req.session.selection_res);
});

app.get("/comments/:discussion_id", (req, res) => {
  const discussion_id = req.params.discussion_id;

  res.send(discussion_id);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Im not gonna continue this anymore. I think its pretty boring to code.
// I'll try to get back to it if I find it interesting again tho
// I'll try another project.
