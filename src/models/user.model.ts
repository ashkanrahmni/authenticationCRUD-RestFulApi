import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  username: string; 
  email: string; 
  password: string; 
  createdAt?: Date; 
  updatedAt?: Date;
}
