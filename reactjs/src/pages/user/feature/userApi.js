import { createApi } from "@reduxjs/toolkit/query/react";
import baseUrl from "utils/api/hook.js";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseUrl,
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: ({ page = 1, entriesPerPage = 10, search = "" }) => ({
				url: `/dashboard/user?search=${search}&entriesPerPage=${entriesPerPage}&page=${page}`,
				method: "GET",
			}),
			providesTags: ["userList"],
		}),
		getUserDetail: builder.query({
			query(id) {
				return {
					url: `/dashboard/user/${id}`,
					method: "GET",
				};
			},
			providesTags: ["userList"],
		}),
		postUser: builder.mutation({
			query: (data) => {
				return {
					url: "/dashboard/user",
					method: "POST",
					body: data,
				};
			},
			invalidatesTags: ["userList"],
		}),
		updateUser: builder.mutation({
			query: ({ data, id }) => {
				return {
					url: `/dashboard/user/${id}`,
					method: "PATCH",
					body: data,
				};
			},
			invalidatesTags: ["userList"],
		}),
		changeUserPassword: builder.mutation({
			query: (data) => {
				return {
					url: `/dashboard/user/password`,
					method: "PATCH",
					body: data,
				};
			},
			invalidatesTags: ["userList"],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/dashboard/user/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["userList"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserDetailQuery,
	usePostUserMutation,
	useUpdateUserMutation,
	useChangeUserPasswordMutation,
	useDeleteUserMutation,
} = userApi;
