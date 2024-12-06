import moment from "moment-timezone";
import { Db } from "../../db/mongo";

export class HomeService {

  // Get the current time and day in Tehran timezone
  static getCurrentTime(): any | Date {
    const time = moment().tz('Asia/Tehran').format('YYYY-MM-DD HH:mm:ss');
    const day = moment().tz('Asia/Tehran').format('dddd');
    return { time, day };
  }

  // Fetch user and activity counts
  static async getUserAndActivityStats(): Promise<{ users: number, activity: number }> {
    const users = await Db.collection("users").countDocuments();
    const activity = await Db.collection("LoginActivity").countDocuments();
    return { users, activity };
  }
}
