import { createClient } from "redis";

export const redisClient = createClient({ url: process.env.REDIS_URI });

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));

export const connectRedis = async () => {
  await redisClient.connect();
};
