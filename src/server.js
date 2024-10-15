require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(
    `Server running on port: ${port}\nlink on: http://localhost:${port}`
  );
});
