import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose.set("strictQuery", false);

const ConnectDB = async () => {
	try {
		mongoose.Promise = Promise;
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Conntect to Mongodb Atlas with Mongoose!");
	} catch (error) {
		console.error(
			"Error connecting to MongoDB Atlas with Mongoose:",
			error
		);
	}
};

const CloseDB = async () => {
	await mongoose.disconnect();
};

export { ConnectDB, CloseDB };
