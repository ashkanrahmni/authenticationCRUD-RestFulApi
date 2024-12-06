import { Request, Response, NextFunction } from "express";
import { EditUserDto } from "../../dto/editUser.dto";
import { ObjectId } from "mongodb";
import { ActivityService } from "./activity.service";

export class ActivityController {
  
  // Get all users
  static async ActivityList(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const activity = await ActivityService.getAllActivity();
      return res.status(200).json(activity)
    } catch (error: any) {
      next(error);  // Handle error with next middleware
    }
  }

  static async DeleteActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activity = await ActivityService.deleteSessionById(req.params.id);
      res.json(activity)
    } catch (error: any) {
      next(error);  // Handle error with next middleware
    }
  }

}
