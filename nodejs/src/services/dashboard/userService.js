import passwordHelper from "../../helpers/passwordHelper.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import NotFoundError from "../../middlewares/errors/notFound.js";
import BadRequestError from "../../middlewares/errors/badRequest.js";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import UnAuthenticatedError from "../../middlewares/errors/unAuthenticated.js";

const userService = {
	index: asyncHandler(async (req) => {
		const entriesPerPage = req.query.entriesPerPage
			? parseInt(req.query.entriesPerPage, 10)
			: 20;
		const page = req.query.page ? parseInt(req.query.page) : 0;

		let sortString = "createdAt";
		let descendingOrDecending = -1;

		let filters = {};

		if (req.query.search) {
			filters.$or = [
				{
					name: {
						$regex: ".*" + req.query.search + ".*",
						$options: "i",
					},
				},
				{
					email: {
						$regex: ".*" + req.query.search + ".*",
						$options: "i",
					},
				},
				{
					phone: {
						$regex: ".*" + req.query.search + ".*",
						$options: "i",
					},
				},
			];
		}

		switch (req.query.sort) {
			case "a_to_z":
				sortString = "name";
				descendingOrDecending = 1;
				break;
			case "z_to_a":
				sortString = "name";
				descendingOrDecending = -1;
				break;
			case "createdAt":
				sortString = "createdAt";
				descendingOrDecending = -1;
				break;
			case "updatedAt":
				sortString = "updatedAt";
				descendingOrDecending = -1;
				break;
			default:
				sortString = "createdAt";
				descendingOrDecending = -1;
		}

		const [total_results, foundUsers] = await Promise.all([
			User.countDocuments(filters),
			User.find(filters)
				.limit(entriesPerPage)
				.skip(entriesPerPage * (page - 1))
				.sort({ [sortString]: descendingOrDecending })
				.select({ updatedAt: 0, __v: 0, password: 0 }),
		]);

		const resObj = {
			success: true,
			message: "Retrieved All User Data",
			data: {
				total_results: total_results,
				found_results: foundUsers.length,
				page: page,
				entries_per_page: entriesPerPage,
				users: foundUsers,
			},
		};

		return resObj;
	}),
	store: asyncHandler(async (req) => {
		const { name, email, phone, address, gender } = req.body;
		if (!name || !email || !phone || !address) {
			throw new BadRequestError(
				"You have to provide user's name, email, phone and address!"
			);
		}

		const password = "1234";
		const hashedPassword = await passwordHelper.hashPassword(password);

		const user = await User.create({
			name: name.toLowerCase(),
			email,
			password: hashedPassword,
			phone,
			address,
			gender,
		});

		if (!user) {
			throw new Error("User creation failed");
		}

		return {
			message: "User created successfully",
		};
	}),
	show: asyncHandler(async (req) => {
		const userId = req.params.id;

		const user = await User.findById(userId, {
			createdAt: 0,
			updatedAt: 0,
			__v: 0,
			password: 0,
		}).lean();

		if (!user) {
			throw new NotFoundError("User not found");
		}

		const resObj = {
			user,
		};

		return {
			message: "Retrieving user detail",
			data: resObj,
		};
	}), // Added closing parenthesis and bracket
	update: asyncHandler(async (req) => {
		const userId = req.params.id;
		const { name, email, phone, address, gender, password } = req.body;

		// Validate input fields
		if (!name && !email && !phone && !address && !gender) {
			throw new BadRequestError(
				"At least one field (name, email, phone, address, or gender) must be provided for update!"
			);
		}

		const updateData = {
			name: name.toLowerCase(),
			email,
			phone,
			address,
			gender,
		};

		const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
			new: true,
			runValidators: true,
			select: { updatedAt: 0, __v: 0, password: 0 },
		}).lean();

		if (!updatedUser) {
			throw new NotFoundError("User not found");
		}

		return {
			message: "User updated successfully",
		};
	}),
	updatePassword: asyncHandler(async (req) => {
		const { oldPassword, newPassword } = req.body;
		const userId = req.jwt.userId;

		if (!oldPassword || !newPassword)
			throw new BadRequestError(
				"oldPassword and newPassword is required"
			);

		const checkUser = await User.findById(userId);

		if (!checkUser) {
			throw new BadRequestError("User not found");
		}

		const isEqual = await bcrypt.compare(oldPassword, checkUser.password);

		if (!isEqual) throw new UnAuthenticatedError("Old Password Incorrect");

		const hashedPassword = await passwordHelper.hashPassword(newPassword);
		checkUser.password = hashedPassword;
		await checkUser.save();

		return {
			message: `User password updated successfully`,
		};
	}),
	delete: asyncHandler(async (req) => {
		const userId = req.params.id;

		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			throw new NotFoundError("User not found");
		}

		return {
			message: "User deleted successfully",
		};
	}),
};

export default userService;
