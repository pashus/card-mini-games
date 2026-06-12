import { Router } from "express";
import { getMe, login, logout, refresh } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", authMiddleware, getMe);

export default router;
