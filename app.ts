import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import authRoutes from "./src/modules/auth/auth.routes";
import homeRoutes from "./src/modules/home/home.routes";
import usersRoutes from "./src/modules/users/user.routes";
import activityRoute from "./src/modules/activity/activity.routes";
import appRoute from "./src/modules/app.routes";

import { connectMongo } from "./src/db/mongo";
import { connectRedis } from "./src/db/redis";
import { engine } from 'express-handlebars';
import dotenv from "dotenv";
import flash from 'express-flash';
import { errorHandler } from "./src/utils/errorHandler";
import path from "path";

const app = express();
dotenv.config();

app.use(errorHandler)
app.use(flash())
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

  
app.use("/", appRoute);

app.use("/auth", authRoutes);

app.use("/home", homeRoutes);

app.use("/users", usersRoutes);

app.use("/activity", activityRoute);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

export const startServer = async () => {
  await connectMongo();
  await connectRedis();
 
  app.listen(3000, () => console.log("Server running on port 3000"));
};
