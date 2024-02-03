var bkfd2Password = require("pbkdf2-password");
var hash = bkfd2Password();

function hashPassword(password, salt, callback) {
  // check if salt has value
  if (typeof salt === "function") {
    callback = salt;
    salt = null;
  }

  // hash password if salt has value
  if (salt) {
    hash({ password: password, salt: salt }, function (err, _pass, salt, hash) {
      if (err) {
        callback(err);
      } else {
        callback(null, { salt: salt, hash: hash });
      }
    });

    // hash password with generated salt
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

function authPass(hashedPassword, password, salt, callback) {
  // hash and check if passed unhashed password and hashed password from DB is equal
  hashPassword(password, salt, function (err, res) {
    console.log("HASHED PASSWORD = " + res.hash);
    console.log("HASHED PASSWORD SALT = " + res.salt);
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

module.exports = {
  authPass,
  hashPassword,
};