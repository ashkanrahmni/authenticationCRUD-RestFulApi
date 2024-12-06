import { ObjectId } from 'mongodb';
import ip from 'request-ip'
const recordLoginActivity = async (req: any, userId: ObjectId, Db: any,token:string): Promise<void> => {
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const INTERNET_PROTOCOL = ip.getClientIp(req)
    const formattedIp = INTERNET_PROTOCOL === '::1' ? '127.0.0.1' : INTERNET_PROTOCOL;
    const existingActivity = await Db.collection("LoginActivity").findOne({ userId });
  
    if (existingActivity) {
      await Db.collection("LoginActivity").updateOne(
        { userId },
        {
          $set: {
            ipAddress:formattedIp,
            userAgent,
            token,
            updatedAt: new Date(),
          },
        }
      );
      console.log("Login activity updated for user:", userId);
    } else {
      await Db.collection("LoginActivity").insertOne({
        userId,
        ipAddress:formattedIp,
        userAgent,
        token,
        createdAt: new Date(),
      });
      console.log("New login activity created for user:", userId);
    }
  };
  
  export { recordLoginActivity };
  