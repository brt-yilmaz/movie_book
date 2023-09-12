import express from "express";
import {signup , login, logout, protect} from '../controllers/authController';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

// Protect all routes after this middleware
router.use(protect);


export default router;