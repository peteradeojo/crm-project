if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import app from "./app";
import DatabaseConnection from "./controllers/database";
import RedisConnection from "./controllers/redis";

const debug = require('debug')('app:index');

DatabaseConnection.connect();
RedisConnection.connect();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  debug(`Server is running on port ${port}`);
});