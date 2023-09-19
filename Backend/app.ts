import express , { Application, RequestHandler, Request } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import AppError from "./utils/appError";
import globalErrorHandler from "./utils/globalErrorHandler";
import hpp from 'hpp'
import xss from "xss";
import cookieParser from "cookie-parser";
import userRouter from './routes/userRouters'
import path from "path";
import reviewRouter from './routes/reviewRouters'
import movieRouter from './routes/movieRouters'



// CONFIGURATIONS

const app: Application = express();
// app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({ extended: true,  limit: '10kb'}));
app.use(cors());

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan("common"));
app.options("*", cors());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());


var html = xss('<script>alert("xss");</script>');

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]

  })
);

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
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/movies', movieRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler)

export default app;