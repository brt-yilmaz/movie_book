"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const appError_1 = __importDefault(require("./utils/appError"));
const globalErrorHandler_1 = __importDefault(require("./utils/globalErrorHandler"));
// CONFIGURATIONS
const app = (0, express_1.default)();
app.enable('trust proxy');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use((0, cors_1.default)());
// Set security HTTP headers
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
app.options("*", (0, cors_1.default)());
// Data sanitization against NoSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, compression_1.default)());
// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
// Limit requests from same API
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.disable('x-powered-by');
// ROUTES
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler_1.default);
exports.default = app;
