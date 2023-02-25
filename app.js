require("dotenv").config();
const express = require("express");
const route = require("./routes");

const app = express();

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 10000000,
  })
);

app.use(express.json({ limit: "50mb" }));

app.use("/api", route);

app.listen(process.env.PORT, () => {
  console.log("server listerning on Port ", process.env.PORT);
});
module.exports = app;
