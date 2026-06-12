import { Router } from "express";
import cardsRoutes from "./yes-no-cards.routes";
import reviewsRoutes from "./reviews.routes";
import categoriesRoutes from "./categories.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/yes-no-cards", cardsRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/auth", authRoutes);

export default router;
