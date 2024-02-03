function insertAccountCred(object, pool) {
  const insertQuery = `
    INSERT INTO account (acc_username, acc_password, pass_salt)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

  pool.query(
    insertQuery,
    [object.username, object.password, object.salt],
    (err, res) => {
      if (err) {
        console.error("Error executing insert query:", err);
      } else {
        console.log("Data inserted successfully", res.rows[0]);
      }
    }
  );
}

function selectAccountCred(username, pool, callback) {
  const selectQuery = `
    SELECT * FROM account WHERE acc_username = '${username}'
    `;

  pool.query(selectQuery, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows[0]);
    }
  });
}

module.exports = {
  insertAccountCred,
  selectAccountCred,
};
