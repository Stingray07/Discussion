require("dotenv").config();
const { Pool } = require("pg");

console.log(process.env.DB_PASSWORD);

// const password = process.env.DB_PASSWORD;
// console.log(password);
// const pool = new Pool({
//   user: "Stingray",
//   host: "localhost",
//   database: "Discussion Database",
//   password: password.toString(),
//   port: 5432,
// });

// function connectToDB(pool) {
//   pool.connect((err, client, release) => {
//     if (err) {
//       return console.error("Error acquiring client", err.stack);
//     }
//     console.log("Connected to PostgreSQL database");
//   });
// }

// connectToDB(pool);
