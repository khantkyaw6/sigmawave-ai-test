import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";
import rateLimit from "express-rate-limit";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import { swaggerUi, specs } from "./config/swagger.config.js";

const app = express();
const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

// Set Rate Limit
const limiter = rateLimit({
	windowMs: 7 * 60 * 1000, // 7 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "50mb",
	})
);

app.use(cors(corsOptions));
app.use(limiter);

// Swagger UI endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", router);

app.get("/", (_req, res) => {
	res.json({
		success: true,
		errCode: 200,
		message: "Welcome from user management server",
	});
});

app.use(errorMiddleware);

export default app;
