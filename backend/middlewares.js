const session = require("express-session");
const { authUser, hashPassword } = require("./auth_ops");
const { insertAccountCred, selectAccountCred } = require("./db_ops");
const { Pool } = require("pg");
const RedisStore = require("connect-redis").default;
const redis = require("redis");
require("dotenv").config();

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
redisClient.on("connect", function (_err) {
  console.log("Connected to redis successfully");
});

const sessionMiddleware = session({
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false,
    httpOnly: true,
  },
});

const authenticate = async (req, res, next) => {
  console.log("AUTH MIDDLEWARE");

  try {
    const auth_res = await authUser(req.body, pool);
    if (auth_res) {
      req.session.username = req.body.username;
      req.session.loggedIn = true;
      console.log(req.sessionID);
      next();
    } else {
      console.log("ACCOUNT NOT IN DB");
      res.status(401).send("Incorrect Credentials");
    }
  } catch (error) {
    console.error("Error in AUTHENTICATE middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createAccount = async (req, res, next) => {
  console.log("CREATE ACCOUNT MIDDLEWARE");

  //Check if username is taken
  try {
    select_res = selectAccountCred(req.body.username, pool);
    if (select_res) {
      res.status(409).send("Username Already Taken");
      return;
    }
  } catch (error) {
    console.error("Error in CREATE ACCOUNT middleware:", error);
    res.status(500).send("Internal Server Error");
  }

  //Hash password and save account credentials
  try {
    hashPassword(req.body.password, async (err, hashedResult) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const accountObject = {
        username: req.body.username,
        password: hashedResult.hash,
        salt: hashedResult.salt,
      };

      const insertionResult = await insertAccountCred(accountObject, pool);
      console.log(insertionResult);

      next();
    });
  } catch (error) {
    console.error("Error in CREATE ACCOUNT middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

const isAuthenticated = (req, res, next) => {
  console.log("ISAUTH MIDDLEWARE");
  try {
    if (req.session.loggedIn === true) {
      next();
    } else {
      res.status(401).send("UNAUTHORIZED");
    }
  } catch (error) {
    console.error("Error in ISAUTH middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res, next) => {
  console.log("LOGOUT MIDDLEWARE");

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      next();
    }
  });
};

module.exports = {
  authenticate,
  sessionMiddleware,
  createAccount,
  isAuthenticated,
  logout,
};
