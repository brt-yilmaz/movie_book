import { isLoggedIn } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.post("/isLoggedIn",isLoggedIn);

export default router;