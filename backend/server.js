const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static("frontend"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login.html", (req, res) => {
  console.log(
    `LOGIN POST: username=${req.body.username}; password=${req.body.password}`
  );
  res.json(req.body);
});

app.post("/create_account.html", (req, res) => {
  console.log(
    `CREATE ACCOUNT POST: username=${req.body.username}; password=${req.body.password}`
  );
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
