const { selectRandomDiscussion } = require("../services/db_ops");

const getDiscussion = (pool) => {
  return async (req, res, next) => {
    console.log("GET DISCUSSION MIDDLEWARE");

    try {
      const selection_res = await selectRandomDiscussion(
        req.session.sentDiscussionIDs,
        pool
      );
      for (let i = 0; i < selection_res.length; i++) {
        discussion_id = selection_res[i].discussion_id;
        req.session.sentDiscussionIDs.push(discussion_id);
      }
      console.log(req.session.sentDiscussionIDs);
      req.session.selection_res = selection_res;
      next();
    } catch (error) {
      console.error("Error in CREATE ACCOUNT middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

module.exports = getDiscussion;
