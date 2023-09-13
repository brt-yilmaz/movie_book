import express from "express";
import {signup , login, logout, protect, forgotPassword} from '../controllers/authController';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.post('/forgotPassword', forgotPassword);

// Protect all routes after this middleware
router.use(protect);


export default router;