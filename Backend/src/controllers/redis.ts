import { createClient, RedisClientType } from 'redis';
const debug = require('debug')('app:redis');

export default class RedisConnection {
  private static client: RedisClientType | null = null;

  static async connect() {
    if (this.client) {
      return this.client;
    }

    this.client = createClient({
      url: process.env.REDIS_URL,
    });
    await this.client.connect();
    debug('Connected to Redis');
  }

  static async disconnect() {
    if (!this.client) {
      return;
    }

    await this.client.disconnect();
    this.client = null;
  }

  static async getClient() {
    if (!this.client) {
      await this.connect();
    }

    return this.client as Readonly<RedisClientType>;
  }
}