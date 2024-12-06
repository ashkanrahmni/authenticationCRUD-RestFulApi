import { Request, Response, NextFunction } from "express";
import { redisClient } from "../db/redis";
import jwt from "jsonwebtoken";
import { deleteModel } from "mongoose";

// Declare a namespace to extend Express.Request
declare global {
  namespace Express {
    interface Request {
      user?: { id: any; username: string }; // Customize based on your JWT payload
    }
  }
}

const SECRET_KEY = "1234567890";  // Use an environment variable in production

export const sessionMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // Extract token from Authorization header or cookies
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message:'UnAuthorized Please Login'})
  }

  try {
    // Verify the token (JWT) for authenticity
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: any; userId: string; username: string 
};

    const session = await redisClient.get(`session:${decoded.id}`);
    if (!session) {
      return res.status(401).json({message:'Session is Expire'})

    }

    // Attach the decoded token data to the request object
    req.user = decoded;  // Store the user info in the req object

    // Optionally, send the user data directly if needed
    res.locals.user = decoded; // Store it in res.locals (for use in route handler)
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors (invalid token, session not found, etc.)
    res.status(500).json({ error: "Token is Not Valid" }); // Invalid token or session issue
  }
};
