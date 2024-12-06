import { ObjectId } from "mongodb";

export interface loginActivity {
  _id?: ObjectId;
  userId: string;
  fingerprint: string;
  ipAddress: string;
  loginTime: Date;
  userAgent: string;
}
