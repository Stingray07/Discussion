const { hashPassword } = require("../auth_ops");
const { insertAccountCred, selectAccountCred } = require("../db_ops");
require("dotenv").config();
const { Pool } = require("pg");

const password = process.env.DB_PASSWORD;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Discussion Database",
  password: password,
  port: 5432,
});

const createAccount = async (req, res, next) => {
  console.log("CREATE ACCOUNT MIDDLEWARE");

  //Check if username is taken
  try {
    select_res = await selectAccountCred(req.body.username, pool);
    console.log(select_res);
    if (Object.keys(select_res).length !== 0) {
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

module.exports = createAccount;
