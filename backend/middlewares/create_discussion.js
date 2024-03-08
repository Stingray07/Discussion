const { insertDiscussion } = require("../services/db_ops");

const create_discussion = (pool) => {
  return async (req, res, next) => {
    console.log("CREATE DISCUSSION MIDDLEWARE");

    try {
      const discussion_object = {
        title: req.body.discussionTopic,
        content: req.body.discussionContent,
        acc_id: hashedResult.salt, //I don't know what to do about this
      };
    } catch (error) {
      console.error("Error in CREATE ACCOUNT middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};
