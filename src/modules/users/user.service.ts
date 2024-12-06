import { Db } from "../../db/mongo";
import { ObjectId } from "mongodb";
import { EditUserDto } from "../../dto/editUser.dto";
import { redisClient } from "../../db/redis";

export class UserService {
  
  // Get all users
  static async getAllUsers(): Promise<any[]> {
    return Db.collection("users").find().toArray();
  }

  // Get a user by ID
  static async getUserById(userId: string): Promise<any | null> {
    return Db.collection("users").findOne({ _id: new ObjectId(userId) });
  }

  // Delete a user by ID
  static async deleteUserById(userId: string): Promise<Object> {
    try {
      // Check Redis session
      const sessionKey = `session:${userId}`;
      const sessionExists = await redisClient.exists(sessionKey);
      const user = await Db.collection("users").findOne({ _id: new ObjectId(userId) });
      if(!user){
        return {message:"user Not found",status:404}
      }
      if (sessionExists) {
        await redisClient.del(sessionKey);
      }

      // Delete user from MongoDB
      const result = await Db.collection("users").deleteOne({ _id: new ObjectId(userId) });
      // If user deleted, update activity collection
      if (result.deletedCount > 0) {
        // Update the activity collection to invalidate or remove the token
        await Db.collection("LogActivity").updateMany(
          { userId: new ObjectId(userId) },
          { $set: { token: null } }
        );
        return {message:"user Deleted",status:200}
      }
      
      return false;
    } catch (error:any) {
      throw new Error(error.message || "Failed to delete user");
    }
  }

  // Edit user by ID
  static async editUserById(userId: string, editUserDto: EditUserDto): Promise<any> {
    const { username, email } = editUserDto;
    const updateQuery = {
      $set: {
        username,
        email,
        updatedAt: new Date(),
      },
    };

    const result = await Db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(userId) },
      updateQuery,
      { returnDocument: "after" }
    );
    return result;
  }
}
