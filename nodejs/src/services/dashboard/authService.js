import passwordHelper from "../../helpers/passwordHelper.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import BadRequestError from "../../middlewares/errors/badRequest.js";
import UnAuthenticatedError from "../../middlewares/errors/unAuthenticated.js";
import bcrypt from "bcryptjs";
import NotFoundError from "../../middlewares/errors/notFound.js";
import jwt from "jsonwebtoken";
import {
	jwt_token_expiresIn,
	jwt_token_secret,
} from "../../../config/auth.config.js";
import User from "../../models/User.js";

const authService = {
	register: asyncHandler(async (req) => {
		const { name, email, phone, password, address, gender } = req.body;

		if (!name || !email || !phone || !password || !address) {
			throw new BadRequestError(
				"You have to provide user's name, email, phone, and address!"
			);
		}

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
			message: "User registered successfully",
		};
	}),
	login: asyncHandler(async (req) => {
		const { email, password } = req.body;
		if (!email || !password)
			throw new BadRequestError("User's email and password is required");

		const user = await User.findOne({ email })
			.select("name email phone address gender createdAt password")
			.lean();

		if (!user) throw new NotFoundError("User does not exist");

		const isEqual = await bcrypt.compare(password, user.password);

		if (!isEqual) throw new UnAuthenticatedError("Incorrect Password");

		const token = authService.signToken(user);

		delete user.password;

		const resData = {
			user,
			token,
		};

		return {
			message: "Login successfully",
			data: resData,
		};
	}),
	signToken: (user) => {
		return jwt.sign(
			{
				userId: user._id,
			},
			jwt_token_secret || "ASSESSMENTTESTWITHSIGMAWAVEAITECHNOLOGY",
			{
				expiresIn: jwt_token_expiresIn + "d",
			}
		);
	},
};

export default authService;
