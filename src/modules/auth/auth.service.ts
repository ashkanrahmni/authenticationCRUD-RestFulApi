import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redisClient } from "../../db/redis";
import { Db } from "../../db/mongo";
import { User } from "../../models/user.model";
import { registerValidation } from "../../utils/validations";
import { LoginDto } from "../../dto/login.dto";
import { Request, Response } from "express";
import { recordLoginActivity } from "../../utils/activityLog";
import { IUserService } from "../../interfaces/userService.interface";

const JWT_SECRET = "1234567890"
const TOKEN_EXPIRY = "1h";

export class AuthService {

  // Register a new user
  async register(userData: Omit<User, "_id">,res:Response,req:Request): Promise<any> {
    // Validate request data
    const { error } = registerValidation.validate(userData);
    if (error) throw new Error(error.details[0].message);

    // Check for existing user
    const existingUser = await Db.collection("users").findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });
    if (existingUser) throw new Error("Email or username already exists");

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Insert the new user into the database
    const result = await Db.collection("users").insertOne({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(200).json({userId:result.insertedId,message:'User Created !'})
    
  }

  // Login a user and return JWT token
  async login(loginDto: LoginDto , req:Request , res:Response): Promise<any> {
    const { username, password } = loginDto;

    // Find the user in the database
    const user = await Db.collection("users").findOne({ username });
    if (!user) return res.status(404).json({message:"User not found"});

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) res.status(404).json({message:"Invalid password"})

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    await recordLoginActivity(req,user._id,Db,token)
    // Store the token in Redis
    await redisClient.set(`session:${user._id}`, token, { EX: 3600 });
    return res.status(200).json({token,_id:user._id})
  }

  // Logout the user by removing their session from Redis
  async logout(userId: string): Promise<void> {
    const result = await redisClient.del(`session:${userId}`);
    if (!result) throw new Error("Error clearing session");

    return;
  }
}

