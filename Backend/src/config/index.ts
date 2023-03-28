const mongoDB = { uri: process.env.MONGO_URI || "mongodb://localhost:27017/crm-project" };

const redis = { url: process.env.REDIS_URL || "redis://localhost:6379" };

export { mongoDB, redis };