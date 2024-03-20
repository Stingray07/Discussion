const { selectRandomDiscussion } = require("../services/db_ops");

const getDiscussion = (pool) => {
  return async (req, res, next) => {
    console.log("GET DISCUSSION MIDDLEWARE");

    try {
      selection_res = await selectRandomDiscussion(pool);
      console.log(selection_res);
      req.session.selection_res = selection_res;
      next();
    } catch (error) {
      console.error("Error in CREATE ACCOUNT middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

module.exports = getDiscussion;
