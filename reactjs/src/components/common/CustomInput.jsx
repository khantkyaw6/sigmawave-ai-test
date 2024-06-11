import React from "react";

const CustomInput = ({ register, name, placeholder, validation, error }) => {
	return (
		<div>
			<input
				{...register(name, validation)}
				placeholder={placeholder}
				className={`appearance-none w-60 h-11 rounded-md pl-3 border ${
					error ? "border-red-500" : "border-blue-500"
				} focus:outline-none`}
			/>
			{error && (
				<p className='text-red-500 text-sm mt-1'>{error.message}</p>
			)}
		</div>
	);
};

export default CustomInput;
