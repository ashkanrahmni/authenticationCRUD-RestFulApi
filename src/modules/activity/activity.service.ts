import { Db } from "../../db/mongo";
import { ObjectId } from "mongodb";
import { EditUserDto } from "../../dto/editUser.dto";
import { redisClient } from "../../db/redis";

export class ActivityService {
  
  // Get all users
  static async getAllActivity(): Promise<any[]> {
    return Db.collection("LoginActivity").find().toArray();
  }

  // Get a user by ID
  static async getUserById(userId: string): Promise<any | null> {
    return Db.collection("users").findOne({ _id: new ObjectId(userId) });
  }

  // Delete a user by ID
  static async deleteSessionById(id: string): Promise<Object> {
    try {
      const ac = await Db.collection("LoginActivity").findOne({ _id: new ObjectId(id) });
      if(!ac){
        return {message:'Activity Not Found !' , status:404}
      }
       await Db.collection("LoginActivity").deleteOne({ _id: new ObjectId(id) });
       return {message:'Activity Deleted !' , status:200}

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
