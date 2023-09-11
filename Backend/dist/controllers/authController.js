"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const signToken = (id) => {
    const signOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    };
    return jsonwebtoken_1.default.sign({ id }, (process.env.JWT_SECRET || ''), signOptions);
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const jwtExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN || '30d';
    // Check if jwtExpiresIn is a number; if not, convert it to a number
    const expiresIn = typeof jwtExpiresIn === 'number'
        ? jwtExpiresIn
        : Number(jwtExpiresIn) * 24 * 60 * 60 * 1000;
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + expiresIn),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
exports.signup = (0, catchAsync_1.default)(async (req, res, next) => {
    const newUser = await UserModel_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    createSendToken(newUser, 201, req, res);
});
