import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET, JWT_TOKEN_EXPIRE_TIME } = process.env;

export const jwt_token_secret = JWT_SECRET;
export const jwt_token_expiresIn = JWT_TOKEN_EXPIRE_TIME;
