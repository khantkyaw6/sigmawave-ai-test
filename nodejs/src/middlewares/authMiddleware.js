import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
	try {
		// Get the JWT token from the request header
		const token =
			req.headers.authorization &&
			req.headers.authorization.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				errCode: 401,
				message: "Authorization token is missing",
			});
		}

		const secret = process.env.JWT_SECRET;

		// Verify the JWT token
		const decoded = jwt.verify(token, secret);

		delete decoded.iat;
		delete decoded.exp;

		// Add the decoded user ID to the request object
		req.jwt = decoded;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			success: false,
			errCode: 401,
			message: "Access token expires. Please try logging in again",
		});
	}
}

export default authMiddleware;
