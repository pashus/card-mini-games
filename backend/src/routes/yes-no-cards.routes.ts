import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCard,
  getCards,
  updateCard,
} from "../controllers";
import { authMiddleware, upload } from "../middlewares";

const router = Router();

router.get("/", getCards);
router.get("/:id", getCard);
router.post("/", authMiddleware, upload.single("image"), createCard);
router.patch("/:id", authMiddleware, upload.single("image"), updateCard);
router.delete("/:id", authMiddleware, deleteCard);

export default router;
