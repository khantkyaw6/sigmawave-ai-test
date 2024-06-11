import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "User name is required."],
		},
		email: {
			type: String,
			required: [true, "User email is required."],
			unique: true,
		},
		phone: {
			type: String,
			required: [true, "User phone is required."],
		},
		password: {
			type: String,
			required: [true, "User password is required."],
		},
		address: {
			type: String,
			required: [true, "User address is required."],
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			default: "male",
		},
	},
	{
		timestamps: true,
	}
);

const User = model("user", userSchema);
export default User;
