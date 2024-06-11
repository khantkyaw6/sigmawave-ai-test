// import { getLocalStorage } from "./utils/localStorage";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { getLocalStorage } from "utils/localStorage";
const url = "http://localhost:3000/api";

const baseUrl = fetchBaseQuery({
	baseUrl: url,
	prepareHeaders: async (headers, { _ }) => {
		const user = await getLocalStorage("user");

		if (user) {
			headers.set("Authorization", `Bearer ${user.token}`);
			headers.set("Cache-Control", "no-cache");
		}
		return headers;
	},
});

export default baseUrl;
