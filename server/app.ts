import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
require("dotenv").config();
export const app: Application = express();

// parsers
app.use(express.json());

//static folder
//app.use(express.static(path.join(__dirname, "./public/index.html")))

//cors
const corsOptions = {
  origin: process.env.ORIGIN || "*",
  credentials: true,
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
};
app.use(cors(corsOptions));

//test route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "Server is OK" });
});

//404 route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `The route: ${req.originalUrl} is not defined`,
  });
});
