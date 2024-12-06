import { Router } from "express";
import { ActivityController } from "./activity.controller";
import { sessionMiddleware } from "../../middlewares/session";

const router = Router();

// Route to get all users
router.get("/", sessionMiddleware,ActivityController.ActivityList);

router.delete("/delete/:id", sessionMiddleware,ActivityController.DeleteActivity);

export default router;
