import baseUrl from "utils/api/hook";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const loginApi = createApi({
	reducerPath: "loginApi",
	baseQuery: baseUrl,
	endpoints: (builder) => ({
		postLogin: builder.mutation({
			query: (data) => ({
				url: "/auth/login",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { usePostLoginMutation } = loginApi;
