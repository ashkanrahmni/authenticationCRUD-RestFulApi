import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb://localhost:27017/Raychat' as string);
export const connectMongo = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB failed:", error);
  }
};

export const Db = client.db(process.env.MONGO_DB_NAME);
