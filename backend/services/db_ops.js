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

function insertDiscussion(object, pool) {
  const columnNames = ["title", "content", "acc_id"];
  const values = [object.title, object.content, object.acc_id];
  return insertData("discussion", values, pool, columnNames);
}

function insertComment(object, pool) {
  const columnNames = ["discussion_id", "acc_id", "content"];
  const values = [object.discussion_id, object.acc_id, object.content];
  return insertData("comment", values, pool, columnNames);
}

function insertAccountCred(object, pool) {
  const columnNames = ["acc_username", "acc_password", "pass_salt"];
  const values = [object.username, object.password, object.salt];
  return insertData("account", values, pool, columnNames);
}

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

async function selectRandomDiscussion(sentDiscussionIDs, pool) {
  // set value to -1 if sentDiscussionIDs is empty else joined sentDiscussionIDs
  const stringSentDiscussionIDs =
    sentDiscussionIDs.length === 0 ? -1 : sentDiscussionIDs.join(", ");

  const selectQuery = `
  SELECT * FROM discussion
  WHERE discussion_id NOT IN (${stringSentDiscussionIDs})
  ORDER BY RANDOM()
  LIMIT 5
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
  selectRandomDiscussion,
};
