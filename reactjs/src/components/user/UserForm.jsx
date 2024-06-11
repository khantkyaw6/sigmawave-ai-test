import CustomInput from "components/common/CustomInput";
import LoadingSpinner from "components/LoadingSpinner";
import {
	usePostUserMutation,
	useUpdateUserMutation,
} from "pages/user/feature/userApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserForm = () => {
	const [updateId, setUpdateId] = useState(null);
	const [updateData, setUpdateData] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [postUser, { isLoading: isLoadingPostUser }] = usePostUserMutation();
	const [updateUser, { isLoading: isLoadingUpdateUser }] =
		useUpdateUserMutation();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const userData = location?.state?.user;
		if (userData) {
			setUpdateData(userData);
			reset(userData); // This will reset the form fields with userData
		}
	}, [location, reset]);

	const onSubmit = (data) => {
		const { name, email, phone, address, gender } = data;

		if (updateData) {
			updateUser({ data, id: updateData._id })
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
		} else {
			postUser(data)
				.unwrap()
				.then((res) => {
					if (res.success) {
						navigate("/");
					}
				})
				.catch((err) => {
					toast.error(err.data.message);
				});
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		navigate(-2);
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-50 '>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-1/2 h-full bg-white border border-gray-500 p-10 rounded-md shadow-lg'
			>
				<div className='flex flex-col gap-3'>
					<div className='flex gap-5'>
						<div className='flex flex-col gap-3'>
							<label>Name</label>
							<CustomInput
								register={register}
								validation={{ required: "Name is required" }}
								name='name'
								placeholder='Enter Your name'
								error={errors.name}
							/>
						</div>
						<div className='flex flex-col gap-3'>
							<label>Email</label>
							<CustomInput
								register={register}
								name='email'
								validation={{
									required: "Email is required",
									pattern: {
										value: /^\S+@\S+$/i,
										message: "Invalid email address",
									},
								}}
								error={errors.email}
								placeholder='Enter Your email'
							/>
						</div>
					</div>
					<div className='flex gap-5'>
						<div className='flex flex-col gap-3'>
							<label>Phone</label>
							<CustomInput
								register={register}
								name='phone'
								validation={{
									required: "Phone number is required",
								}}
								error={errors.phone}
								placeholder='Enter Your phone number'
							/>
						</div>
						<div className='flex flex-col gap-3'>
							<label>Address</label>
							<CustomInput
								register={register}
								name='address'
								validation={{ required: "Address is required" }}
								error={errors.address}
								placeholder='Enter Your Address'
							/>
						</div>
					</div>
					<div className='flex gap-5'>
						<div className='flex flex-col gap-3'>
							<label>Gender</label>
							<select
								{...register("gender", {
									required: "Gender is required",
								})}
								className='appearance-none w-60 h-11 rounded-md pl-3 pr-8 border border-blue-500 focus:outline-none bg-white'
								style={{
									background:
										"url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22><path fill=%22none%22 d=%22M0 0h24v24H0z%22/><path fill=%22%23000%22 d=%22M7 10l5 5 5-5z%22/></svg>') no-repeat right 0.75rem center/8px 8px",
								}}
							>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</select>
						</div>
					</div>

					<div className='flex items-center gap-3 mt-20'>
						<button
							type='button'
							onClick={handleCancel}
							className='w-48 h-11 bg-white rounded-md text-black border border-blue-500'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='w-48 h-11 bg-blue-500 rounded-md text-white hover:bg-blue-300 flex items-center justify-center'
						>
							{updateData ? (
								isLoadingUpdateUser ? (
									<LoadingSpinner />
								) : (
									"Update"
								)
							) : isLoadingPostUser ? (
								<LoadingSpinner />
							) : (
								"Save"
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UserForm;
