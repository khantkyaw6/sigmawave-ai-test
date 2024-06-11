import express from "express";
const router = express.Router();
import dashboardRoutes from "./dashboard/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authRoute from "./dashboard/authRoute.js";

router.use("/auth", authRoute);
router.use("/dashboard", authMiddleware, dashboardRoutes);

export default router;
