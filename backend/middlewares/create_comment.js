const { insertComment } = require("../services/db_ops");

const createComment = (pool) => {
  return async (req, res, next) => {
    console.log("CREATE COMMENT MIDDLEWARE");

    try {
      const discussion_object = {
        discussion_id: req.body.discussionTopic,
        acc_id: req.session.acc_id,
        content: req.body.comment,
      };

      insertion_res = await insertDiscussion(discussion_object, pool);
      console.log(insertion_res);

      next();
    } catch (error) {
      console.error("Error in CREATE ACCOUNT middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

module.exports = createDiscussion;
