var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var assert = require("assert");
var opts = {
  password: "helloworld",
};

hasher(opts, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  opts.salt = salt;
  opts.hash = hash;

  console.log(opts);
});

console.log(opts);
