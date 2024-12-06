import { NextFunction, Request, Response } from "express";
import { HomeService } from "./home.service"; // Import HomeService

export class HomeController {

  // Handle the home page index
  static async homeIndex(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // Get the current user and stats
      const currentUser = req.user;
      const { users, activity } = await HomeService.getUserAndActivityStats();
      const { time, day } = HomeService.getCurrentTime();
      return res.status(200).json(
        {
          user: currentUser,
          users,
          activity,
          time,
          day
      }
      )
    } catch (error: any) {
      // Handle any errors that occur during data fetching or rendering
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  // Handle the login page
  static async loginIndex(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      return res.render('loginPage/index', {
        title: 'ورود',
        message: 'خوش آمدید'
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  // Handle the register page
  static async registerIndex(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      return res.render('registerPage/index', {
        title: 'ورود',
        message: req.flash()
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }
}
