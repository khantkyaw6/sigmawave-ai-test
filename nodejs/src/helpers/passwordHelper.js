import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const passwordHelper = {
	hashPassword: async (password) => {
		const salt = await bcrypt.genSalt(process.env.SALT * 1);
		return bcrypt.hashSync(password, salt);
	},
};

export default passwordHelper;
