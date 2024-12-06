import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service"; // Import AuthService
import { recordLoginActivity } from "../../utils/activityLog";

export class AuthController {

  // Instantiate AuthService
  static authService = new AuthService();

  // Handle Login Logic
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Use AuthService to authenticate the user
      await AuthController.authService.login(req.body,req,res);
    } catch (error: any) {
      next(error)
    }
  }

  // Render Login Page
  static async loginIndex(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      return res.render('loginPage/index', {
        title: 'ورود',
        message: req.flash()
      });
    } catch (error: any) {
      // Handle errors and forward to next middleware
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  // Render Register Page
  static async registerIndex(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      return res.render('registerPage/index', {
        title: 'SignUp',
        message: req.flash()
      });
    } catch (error: any) {
      // Handle errors and forward to next middleware
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  // Handle Register Logic
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Use AuthService to register the user
      await AuthController.authService.register(req.body,res,req);
    } catch (error: any) {
      next(error)
    }
  }

  // Handle Logout Logic
  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Get user ID from params and logout using AuthService
      const { id } = req.params;
      await AuthController.authService.logout(id);
      res.redirect("/auth/login"); // Redirect to login page after logout
    } catch (error: any) {
      // Log the error and return a flash message
      req.flash("error", error.message || "Logout failed");
      return res.render('registerPage/index', { messages: req.flash() });
    }
  }
}
