import { Router } from "express";
import authController from "../../controllers/dashboard/authController.js";
const router = Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

export default router;
