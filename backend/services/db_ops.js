//Insert account details to DB
// async function insertAccountCred(object, pool) {
//   const insertQuery = `
//     INSERT INTO account (acc_username, acc_password, pass_salt)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//     `;

//   try {
//     const res = await pool.query(insertQuery, [
//       object.username,
//       object.password,
//       object.salt,
//     ]);

//     return res.rows;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function insertDiscussion(object, pool) {
//   const insertQuery = `
//     INSERT INTO discussion (title, content, acc_id)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//     `;

//   try {
//     const res = await pool.query(insertQuery, [
//       object.title,
//       object.content,
//       object.acc_id,
//     ]);

//     return res.rows;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function insertComment(object, pool) {

//   // discussion_id and acc_id naming convention not consistent
//   const insertQuery = `
//     INSERT INTO comment (discussion_id, acc_id, content)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//     `;

//   try {
//     const res = await pool.query(insertQuery, [
//       object.title,
//       object.content,
//       object.acc_id,
//     ]);

//     return res.rows;
//   } catch (err) {
//     console.log(err);
//   }
// }

async function insertData(tableName, object, pool, columnNames) {
  const placeholders = columnNames
    .map((_, index) => `$${index + 1}`)
    .join(", ");
  const insertQuery = `
    INSERT INTO ${tableName} (${columnNames.join(", ")})
    VALUES (${placeholders})
    RETURNING *;
  `;

  console.log(insertQuery);

  try {
    const res = await pool.query(insertQuery, object);
    return res.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function insertDiscussion(object, pool) {
  const columnNames = ["title", "content", "acc_id"];
  const values = [object.title, object.content, object.acc_id];
  return insertData("discussion", values, pool, columnNames);
}

async function insertComment(object, pool) {
  const columnNames = ["discussion_id", "acc_id", "content"];
  const values = [object.discussion_id, object.acc_id, object.content];
  return insertData("comment", values, pool, columnNames);
}

async function insertAccountCred(object, pool) {
  const columnNames = ["acc_username", "acc_password", "pass_salt"];
  const values = [object.username, object.password, object.salt];
  return insertData("account", values, pool, columnNames);
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
  insertDiscussion,
  insertComment,
  selectAccountCred,
};
