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

function insertAccountCred(object, pool) {
  const insertQuery = `
    INSERT INTO account (acc_username, acc_password)
    VALUES ($1, $2)
    RETURNING *;
    `;

  pool.query(insertQuery, [object.username, object.password], (err, res) => {
    if (err) {
      console.error("Error executing insert query:", err);
    } else {
      console.log("Data inserted successfully", res.rows[0]);
    }
  });
}

function selectAccountCred(username, pool) {
  const selectQuery = `
    SELECT * FROM account WHERE acc_username = '${username}'
    `;

  pool.query(selectQuery, (err, res) => {
    if (err) {
      console.error("Error executing select query", err);
    } else {
      console.log(res.rows[0]);
    }
  });
}

module.exports = {
  insertAccountCred,
  selectAccountCred,
};
