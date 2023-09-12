"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.protect = exports.logout = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
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
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new appError_1.default('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await UserModel_1.default.findOne({ email }).select('+password');
    if (!user || !(await user?.correctPassword?.(password, user.password))) {
        return next(new appError_1.default('Incorrect email or password', 401));
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});
const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};
exports.logout = logout;
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in! Please log in to get access.', 401));
    }
    // 2) Verification token
    const decoded = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
    // 3) Check if user still exists
    const currentUser = await UserModel_1.default.findById(decoded.id);
    if (!currentUser) {
        return next(new appError_1.default('The user belonging to this token does no longer exist.', 401));
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter?.(decoded.iat)) {
        return next(new appError_1.default('User recently changed password! Please log in again.', 401));
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});
// To check if user is logged in or not
const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await jsonwebtoken_1.default.verify(req.cookies.jwt, process.env.JWT_SECRET || '');
            // 2) Check if user still exists
            const currentUser = await UserModel_1.default.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            // 3) Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter?.(decoded.iat)) {
                return next();
            }
            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        }
        catch (err) {
            return next();
        }
    }
    next();
};
exports.isLoggedIn = isLoggedIn;
