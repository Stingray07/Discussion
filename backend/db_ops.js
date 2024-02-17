//Insert account details to DB
async function insertAccountCred(object, pool) {
  const insertQuery = `
    INSERT INTO account (acc_username, acc_password, pass_salt)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

  try {
    const res = await pool.query(insertQuery, [
      object.username,
      object.password,
      object.salt,
    ]);

    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

//Return row of username parameter to DB
async function selectAccountCred(username, pool) {
  const selectQuery = `
    SELECT * FROM account WHERE acc_username = '${username}'
    `;

  try {
    const res = await pool.query(selectQuery);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  insertAccountCred,
  selectAccountCred,
};
