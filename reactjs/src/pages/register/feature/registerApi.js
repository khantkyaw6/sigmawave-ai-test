import baseUrl from "utils/api/hook";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const registerApi = createApi({
	reducerPath: "registerApi",
	baseQuery: baseUrl,
	endpoints: (builder) => ({
		postRegister: builder.mutation({
			query: (data) => ({
				url: "/auth/register",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { usePostRegisterMutation } = registerApi;
