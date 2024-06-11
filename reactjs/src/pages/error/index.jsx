import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../assets/images/errordefault.png";

const NotFound = () => {
	const navigate = useNavigate();

	const goHome = () => {
		navigate("/");
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center'>
			<img
				src={ErrorPage}
				alt='Error Page'
				className='max-w-full h-auto'
			/>
			<div className='mt-6 text-xl text-gray-700'>
				Oops! The page you're looking for doesn't exist.
			</div>
			<button
				onClick={goHome}
				className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
			>
				Go Home
			</button>
		</div>
	);
};

export default NotFound;
