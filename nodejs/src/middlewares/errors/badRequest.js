import CustomApiError from "./customError.js";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomApiError {
	constructor(
		message,
		errCode = StatusCodes.BAD_REQUEST,
		errorCode = StatusCodes.BAD_REQUEST
	) {
		super(message);
		this.statusCode = errCode;
		this.errorCode = errorCode;
	}
}

export default BadRequestError;
