import dotenv from "dotenv";
import app from "./app.js";
import { ConnectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

await ConnectDB()
	.then(() => {
		app.listen(PORT, console.log("Server is running at PORT", PORT));
	})
	.catch((err) => console.log(err));
