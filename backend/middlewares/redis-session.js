const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");

const redisClient = redis.createClient();
redisClient.connect().catch(console.error);
const redisStore = new RedisStore({
  client: redisClient,
});

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (_err) {
  console.log("Connected to redis successfully");
});

const sessionMiddleware = session({
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false,
    httpOnly: true,
  },
});

module.exports = {
  sessionMiddleware,
};
