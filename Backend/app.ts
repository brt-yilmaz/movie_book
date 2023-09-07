import express , { Application, RequestHandler, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import AppError from "./utils/appError";

// CONFIGURATIONS

const app: Application = express();
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({ extended: true,  limit: '10kb'}));
app.use(cors());

// Set security HTTP headers
app.use(helmet());
app.use(morgan("common"));
app.options("*", cors());
app.use(express.static(path.join(__dirname, 'public')));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use(compression());

// Test middleware
app.use((req: Request, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Limit requests from same API
const limiter: RequestHandler = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
app.disable('x-powered-by')

// ROUTES

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;