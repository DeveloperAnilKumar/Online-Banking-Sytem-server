const express = require("express");

const dbConnection = require("./config/dbConnection");
const userRouter = require("./routes/userRouter");
const trxRouter = require("./routes/trxRouter");
const app = express();

app.use(express.json());

dbConnection();

app.use("/api/v1", userRouter);

app.use("/api/v1", trxRouter);

app.get("/", (req, res) => {
  res.send("<h1> welcome to online banking system </h1>");
});

app.listen(4000, () => {
  console.log(`server running on port  ${4000} `);
});
