import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
import Login from "pages/login";
import Register from "pages/register";
import User from "pages/user";
import UserForm from "components/user/UserForm.jsx";
import UserPasswordForm from "components/user/UserPasswordForm.jsx";
import NotFound from "pages/error";

const AppRouter = () => {
	const config = createBrowserRouter([
		{
			path: "/login",
			element: (
				<PrivateRoutes>
					<Login />
				</PrivateRoutes>
			),
		},
		{
			path: "/register",
			element: (
				<PrivateRoutes>
					<Register />
				</PrivateRoutes>
			),
		},
		{
			path: "/",
			element: (
				<PrivateRoutes>
					<User />
				</PrivateRoutes>
			),
		},
		{
			path: "/user/create",
			element: (
				<PrivateRoutes>
					<UserForm />,
				</PrivateRoutes>
			),
		},
		{
			path: "/user/password",
			element: (
				<PrivateRoutes>
					<UserPasswordForm />,
				</PrivateRoutes>
			),
		},
		{
			path: "/*",
			element: <NotFound />,
		},
	]);
	return <RouterProvider router={config} />;
};

export default AppRouter;
