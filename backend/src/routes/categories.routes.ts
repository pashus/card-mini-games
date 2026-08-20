import { Router } from "express";
import { createCategories, getCategories } from "../controllers";

const router = Router();

router.post("/", createCategories);
router.get("/", getCategories);

export default router;
