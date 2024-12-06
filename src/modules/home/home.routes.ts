import { Router } from "express";
import { HomeController } from "./home.controller"; // Import HomeController
import { sessionMiddleware } from "../../middlewares/session";

const router = Router();

// Use HomeController for routing
router.get("/", sessionMiddleware, HomeController.homeIndex);

export default router;
