import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "utils/localStorage";
import { useDispatch } from "react-redux";
import { setUserData } from "pages/login/feature/loginSlice";

const PrivateRoutes = ({ children }) => {
	const { token } = useSelector((state) => state.loginSlice);

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const checkToken = async () => {
		const userData = await getLocalStorage("user");

		if (userData?.token) {
			dispatch(setUserData(userData));
			location.pathname == "/" || location.pathname == "/login"
				? navigate("/")
				: navigate(location.pathname);
		} else {
			location.pathname == "/register"
				? navigate("/register")
				: navigate("/login");
		}
	};

	useEffect(() => {
		checkToken();
	}, [navigate]);

	return children;
};

export default PrivateRoutes;
