"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// to avoid uncaughtException
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
//For env File 
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
// MONGOOSE SETUP
const PORT = process.env.PORT || 5000;
const uri = process.env.DB_URI || '';
mongoose_1.default
    .connect(uri)
    .then(() => console.log(`DB connection successful! 🎉`));
// custom error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
exports.default = errorHandler;
const server = app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
