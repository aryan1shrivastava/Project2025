import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getMyProfile } from "../controllers/user.controller";

const router = Router();

router.get("/me", protect, getMyProfile);

export default router;
