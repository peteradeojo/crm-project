import { createClient } from 'redis';
const debug = require('debug')('app:redis');

export default class RedisConnection {
  private static client: any | null = null;

  static async connect() {
    if (this.client) {
      return this.client;
    }

    const client = createClient({
      url: process.env.REDIS_URL,
    });
    await client.connect();
    debug('Connected to Redis');

    this.client = client;
    return client;
  }

  static async disconnect() {
    if (!this.client) {
      return;
    }

    await this.client.disconnect();
    this.client = null;
  }
}