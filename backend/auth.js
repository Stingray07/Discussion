var bkfd2Password = require("pbkdf2-password");
var hash = bkfd2Password();
var assert = require("assert");
const { accessSync } = require("fs");

function hashPassword(password, salt, callback) {
  if (typeof salt === "function") {
    callback = salt;
    salt = null;
  }

  if (salt) {
    hash({ password: password, salt: salt }, function (err, pass, salt, hash) {
      if (err) {
        callback(err);
      } else {
        callback(null, { salt: salt, hash: hash });
      }
    });
  } else {
    hash({ password: password }, function (err, pass, salt, hash) {
      if (err) {
        callback(err);
      } else {
        callback(null, { salt: salt, hash: hash });
      }
    });
  }
}

// function authUserAndPass(username, password, callback) {
//   hashPassword(actualPassword, function (err, res) {
//     if (err) {
//       console.error(err);
//     } else {
//       hashedActualPassword = res.hash;
//       actualPasswordSalt = res.salt;

//       hashPassword({ password: password }, function (err, res) {
//         if (err) {
//           console.error(err);
//         } else {
//         }
//       });
//     }
//   });
// }
