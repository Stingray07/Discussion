var bkfd2Password = require("pbkdf2-password");
const { selectAccountCred } = require("./db_ops");
var hash = bkfd2Password();

function hashPassword(password, salt, callback) {
  // Check if salt has value
  if (typeof salt === "function") {
    callback = salt;
    salt = null;
  }

  // Hash password with salt parameter
  if (salt) {
    hash({ password: password, salt: salt }, function (err, _pass, salt, hash) {
      if (err) {
        callback(err);
      } else {
        callback(null, { salt: salt, hash: hash });
      }
    });

    // Hash password with generated salt
  } else {
    hash({ password: password }, function (err, _pass, salt, hash) {
      if (err) {
        callback(err);
      } else {
        callback(null, { salt: salt, hash: hash });
      }
    });
  }
}

async function authPass(hashedPassword, password, salt, callback) {
  // Hash passed password then check if it's equal to original hashed password
  hashPassword(password, salt, function (err, res) {
    if (err) {
      callback(err);
    } else {
      if (res.hash === hashedPassword) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  });
}

async function authUser(user_info, pool) {
  try {
    // Get and check if username in DB
    const accountInfo = await selectAccountCred(user_info.username, pool);

    // Check if accountInfo has values
    if (Object.keys(accountInfo).length !== 0) {
      return new Promise((resolve, reject) => {
        authPass(
          accountInfo[0].acc_password,
          user_info.password,
          accountInfo[0].pass_salt,
          (err, res) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  authUser,
  hashPassword,
};
