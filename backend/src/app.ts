import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";

import { AppError } from "./shared/errors/AppError";
import { router } from "./shared/infra/http/routes";

dotenv.config();
import "./config/connect-to-db";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Middleware for handle errors
app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal Server Error - ${err.message}`,
  });
});

const port: number = Number(process.env.PORT) || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}... 🏃`);
});
