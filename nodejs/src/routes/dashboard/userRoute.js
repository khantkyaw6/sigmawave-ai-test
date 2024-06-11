import { Router } from "express";
import userController from "../../controllers/dashboard/userController.js";

const router = Router();

router.route("/").get(userController.index).post(userController.store);
router.route("/password").patch(userController.updatePassword);

router
	.route("/:id")
	.get(userController.show)
	.patch(userController.update)
	.delete(userController.delete);

export default router;
