import { useChangeUserPasswordMutation } from "pages/user/feature/userApi";
import { useForm } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserPasswordForm = () => {
	const [changeUserPassword] = useChangeUserPasswordMutation();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const cancelHandller = () => {
		navigate("/");
	};

	const onSubmit = (data) => {
		changeUserPassword(data)
			.unwrap()
			.then((res) => {
				if (res.success) {
					toast.success(res.message);
					navigate("/");
				}
			})
			.catch((err) => {
				if (!err.data.success) {
					toast.error(err.data.message);
				}
			});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='min-h-screen flex items-center justify-center bg-gray-100'>
					<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
						<h2 className='text-2xl font-bold mb-6 text-gray-800'>
							Update Password
						</h2>

						<div className='mb-4'>
							<label
								for='old-password'
								className='block text-gray-700 font-medium mb-2'
							>
								Old Password
							</label>
							<input
								{...register("oldPassword", {
									required: {
										value: true,
										message: "Old Password is required",
									},
								})}
								type='password'
								id='old-password'
								className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>
						<p className='text-red-500 text-sm '>
							{errors?.oldPassword?.message}
						</p>
						<div className='mb-4'>
							<label
								for='new-password'
								className='block text-gray-700 font-medium mb-2'
							>
								New Password
							</label>
							<input
								{...register("newPassword", {
									required: {
										value: true,
										message: "New Password is required",
									},
								})}
								type='password'
								id='new-password'
								className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<p className='text-red-500 text-sm '>
								{errors?.newPassword?.message}
							</p>
						</div>
						<div className='flex justify-start gap-3'>
							<button
								onClick={cancelHandller}
								type='button'
								className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default UserPasswordForm;
