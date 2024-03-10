const { authUser } = require("../services/auth_ops");

const authenticate = (pool) => {
  return async (req, res, next) => {
    console.log("AUTH MIDDLEWARE");

    try {
      const auth_res = await authUser(req.body, pool);
      console.log(auth_res);
      if (auth_res) {
        console.log(auth_res);
        req.session.username = req.body.username;
        req.session.loggedIn = true;
        req.session.acc_id = auth_res.acc_id;
        console.log(req.sessionID);
        next();
      } else {
        console.log("ACCOUNT NOT IN DB");
        res.status(401).send("Incorrect Credentials");
      }
    } catch (error) {
      console.error("Error in AUTHENTICATE middleware:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

const isAuthenticated = (req, res, next) => {
  console.log("ISAUTH MIDDLEWARE");
  try {
    if (req.session.loggedIn === true) {
      next();
    } else {
      res.status(401).send("UNAUTHORIZED");
    }
  } catch (error) {
    console.error("Error in ISAUTH middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = (req, res, next) => {
  console.log("LOGOUT MIDDLEWARE");

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      next();
    }
  });
};

module.exports = {
  isAuthenticated,
  authenticate,
  logout,
};
