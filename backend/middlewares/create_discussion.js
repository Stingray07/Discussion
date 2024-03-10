const { insertDiscussion } = require("../services/db_ops");

const createDiscussion = (pool) => {
  return async (req, res, next) => {
    console.log("CREATE DISCUSSION MIDDLEWARE");

    try {
      const discussion_object = {
        title: req.body.discussionTopic,
        content: req.body.discussionContent,
        acc_id: req.session.acc_id,
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
