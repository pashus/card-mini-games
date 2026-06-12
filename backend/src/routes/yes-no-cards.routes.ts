import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCard,
  getCards,
  updateCard,
} from "../controllers";
import { upload } from "../middlewares";

const router = Router();

router.get("/", getCards);
router.get("/:id", getCard);
router.post("/", upload.single("image"), createCard);
router.patch("/:id", upload.single("image"), updateCard);
router.delete("/:id", deleteCard);

export default router;
