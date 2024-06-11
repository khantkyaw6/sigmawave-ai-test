import responseMessage from "../../helpers/responseMessageHelper.js";
import authService from "../../services/dashboard/authService.js";

const authController = {
	register: async (req, res, next) => {
		authService
			.register(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
	login: async (req, res, next) => {
		authService
			.login(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
};

export default authController;
