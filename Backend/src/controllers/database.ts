import mongoose from "mongoose";

import * as config from "../config";
const debug = require("debug")("app:database");

mongoose.set("toJSON", { virtuals: true });
export default class MongoConnection {
  private static connection: typeof mongoose | null = null;

  static async connect() {
    if (this.connection) {
      return this.connection;
    }

    const connection = await mongoose.connect(config.mongoDB.uri);
    this.connection = connection;
    debug("Connected to MongoDB");
    return connection;
  }

  static async disconnect() {
    if (!this.connection) {
      return;
    }

    await mongoose.disconnect();
    this.connection = null;
    debug("Disconnected from MongoDB");
  }
}
