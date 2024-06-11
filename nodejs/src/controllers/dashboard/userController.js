import responseMessage from "../../helpers/responseMessageHelper.js";
import userService from "../../services/dashboard/userService.js";
// import userService from "../../services/userService.js";

const userController = {
	index: async (req, res, next) => {
		userService
			.index(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
	show: async (req, res, next) => {
		userService
			.show(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
	store: async (req, res, next) => {
		userService
			.store(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
	update: async (req, res, next) => {
		userService
			.update(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
	updatePassword: async (req, res, next) => {
		userService
			.updatePassword(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
	delete: async (req, res, next) => {
		userService
			.delete(req)
			.then((data) => {
				responseMessage(res, data.message, data.data, 200);
			})
			.catch((err) => {
				next(err);
			});
	},
};

export default userController;
