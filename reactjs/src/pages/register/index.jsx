import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostRegisterMutation } from "./feature/registerApi";
import { toast } from "sonner";
import LoadingSpinner from "components/LoadingSpinner";

const Register = () => {
	const [postRegister, { isLoading }] = usePostRegisterMutation();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = (data) => {
		const registerData = { ...data, password: "1234" };

		postRegister(registerData)
			.unwrap()
			.then((res) => {
				if (res.success) {
					toast.success(res.message);
					navigate("/");
				}
			})
			.catch((err) => {
				toast.error(err.data.message);
			});
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white grid place-content-center gap-10 border border-gray-200 p-12 rounded-xl drop-shadow-lg w-auto'
			>
				<h1 className='text-4xl font-semibold text-center'>Register</h1>
				<div className='grid gap-8'>
					<div className='flex items-center gap-5'>
						<div className='h-11 flex flex-col'>
							<input
								{...register("name", {
									required: {
										value: true,
										message: "Name is required",
									},
								})}
								placeholder='Name'
								type='text'
								className='appearance-none w-full h-11 rounded-md pl-3 border border-blue-500 focus:outline-none'
							/>
							<p className='text-red-500 text-sm'>
								{errors.name && errors.name.message}
							</p>
						</div>

						<div className='h-11 flex flex-col'>
							<input
								{...register("email", {
									required: {
										value: true,
										message: "Email required",
									},
									pattern: {
										value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
										message: "Please enter a valid email",
									},
								})}
								placeholder='Email'
								className='appearance-none w-full h-11 rounded-md pl-3 border border-blue-500 focus:outline-none'
							/>
							<p className='text-red-500 text-sm py-1'>
								{errors.email && errors.email.message}
							</p>
						</div>
					</div>

					<div className='flex items-center gap-5'>
						<div className='h-11 flex w-full flex-col relative'>
							<select
								{...register("gender", {
									required: "Gender is required",
								})}
								className='appearance-none w-full h-11 rounded-md pl-3 pr-8 border border-blue-500 focus:outline-none bg-white'
							>
								<option value=''>Select Gender</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</select>
							<p className='text-red-500 text-sm py-1'>
								{errors.gender && errors.gender.message}
							</p>
							<div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
								<svg
									className='w-5 h-5 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</div>
						</div>

						<div className='h-11 flex flex-col w-full'>
							<input
								{...register("phone", {
									required: "Phone is required",
									pattern: {
										value: /^\d+$/,
										message: "Please enter a valid phone",
									},
								})}
								placeholder='Phone'
								className='appearance-none w-full h-11 rounded-md pl-3 border border-blue-500 focus:outline-none'
							/>
							<p className='text-red-500 text-sm py-1'>
								{errors.phone && errors.phone.message}
							</p>
						</div>
					</div>

					<div className='flex flex-col'>
						<textarea
							rows={5}
							{...register("address", {
								required: "Address is required",
							})}
							placeholder='Address'
							className='appearance-none w-full rounded-md p-3 border border-blue-500 focus:outline-none resize-none'
						/>
						<p className='text-red-500 text-sm py-1'>
							{errors.address && errors.address.message}
						</p>
					</div>
				</div>
				<div className='text-center text-gray-500 text-sm'>
					Default password is 1234
				</div>
				<div>
					<button
						type='submit'
						disabled={isLoading}
						className='w-full h-11 bg-blue-500 rounded-md text-white hover:bg-blue-300 flex items-center justify-center disabled:opacity-50'
					>
						{isLoading ? <LoadingSpinner /> : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
