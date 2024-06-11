import CustomApiError from "./customError.js";
import { StatusCodes } from "http-status-codes";

class UnAuthenticatedError extends CustomApiError {
	constructor(message = "You are not allowed to visit this route !") {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export default UnAuthenticatedError;
