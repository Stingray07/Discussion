const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { authUser, hashPassword } = require("./auth_ops");
const { insertAccountCred } = require("./db_ops");
const { Pool } = require("pg");
const RedisStore = require("connect-redis").default;
const redis = require("redis");
const path = require("path");
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
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);
const redisStore = new RedisStore({
  client: redisClient,
});

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.use(express.static(path.join(__dirname, "../frontend")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
  })
);

// Main GET handler
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.get("/home.html", (req, res) => {});

// Login POST handler
app.post("/login.html", async (req, res) => {
  try {
    authUser(req.body, pool)
      .then((auth_res) => {
        if (auth_res) {
          const session = req.session;
          session.username = req.body.username;
          // THINK ABOUT SESSION LOGIC
          // Create Session Here
          res.redirect("/home.html");
          console.log("REDIRECT");
        } else {
          console.log("ACCOUNT NOT IN DB");
        }
      })
      .catch((err) => {
        console.error("Error in login post handler:", err);
        res.status(500).send("Internal Server Error");
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
