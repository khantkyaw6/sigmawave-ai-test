import CustomApiError from "./errors/customError.js"; // Adjusted path with '.js' extension
import { StatusCodes } from "http-status-codes";
import multer from "multer";

const errorMiddleware = (error, req, res, next) => {
	console.log(error);
	if (error instanceof multer.MulterError) {
		switch (error.code) {
			case "LIMIT_FILE_SIZE":
				return res.status(400).json({
					success: false,
					errCode: 400,
					message: "File is too large",
				});
			case "LIMIT_FILE_COUNT":
				return res.status(400).json({
					success: false,
					errCode: 400,
					message: "File limit reached",
				});
			case "LIMIT_UNEXPECTED_FILE":
				return res.status(400).json({
					success: false,
					errCode: 400,
					message: "Uploaded file Must be required file type",
				});
			case "UNEXPECTED_IMAGE_FILE":
				return res.status(400).json({
					success: false,
					errCode: 400,
					message: "Uploaded file Must be an image file",
				});
			case "UNEXPECTED_PDF_FILE":
				return res.status(400).json({
					success: false,
					errCode: 400,
					message: "Uploaded file Must be a pdf file",
				});
		}
	} else if (error instanceof CustomApiError) {
		return res.status(error.statusCode).json({
			success: false,
			errCode: error.statusCode,
			message: error.message,
		});
	} else if (error.name === "MongoServerError") {
		if (error.code === 11000) {
			let duplicatedKeys = Object.keys(error.keyValue);
			let duplicatedCollection =
				error.errmsg
					.split("collection: ")[1]
					.split(" ")[0]
					.split(".")[1][0]
					.toUpperCase() +
				error.errmsg
					.split("collection: ")[1]
					.split(" ")[0]
					.split(".")[1]
					.slice(1);
			return res.status(StatusCodes.CONFLICT).json({
				success: false,
				errCode: StatusCodes.CONFLICT,
				message: `${duplicatedCollection} with current ${duplicatedKeys.join(
					", "
				)} already exist.`,
			});
		}
	} else if (error?.message?.includes("validation failed")) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			errCode: StatusCodes.BAD_REQUEST,
			message: "Please, provide all the necessicity fields.",
		});
	} else {
		let statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
		let errorCode =
			error.errorCode ||
			error.statusCode ||
			StatusCodes.INTERNAL_SERVER_ERROR;

		res.status(statusCode).json({
			success: false,
			errCode: errorCode,
			message: error.message,
		});
	}
};

export default errorMiddleware;
