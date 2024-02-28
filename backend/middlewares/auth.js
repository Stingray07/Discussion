const { authUser } = require("../auth_ops");
const { Pool } = require("pg");

require("dotenv").config();

const password = process.env.DB_PASSWORD;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Discussion Database",
  password: password,
  port: 5432,
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
  isAuthenticated,
  authenticate,
  logout,
};
