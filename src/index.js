const express = require("express");

const bodyParser = require("body-parser");
const connect = require("./database/connect");
const config = require("./config/default");
const cors = require("cors");

const port = config.port;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", require("./routes/user.routes"));

connect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
