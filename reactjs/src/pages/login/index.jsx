import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "./feature/loginApi";
import { setUserData } from "./feature/loginSlice";
import { setLocalStorage } from "utils/localStorage";
import { toast } from "sonner";
import LoadingSpinner from "components/LoadingSpinner";

const Login = () => {
	const [postLogin, { isLoading }] = usePostLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		postLogin(data)
			.unwrap()
			.then(async (res) => {
				if (res.success) {
					dispatch(setUserData(res.data));
					await setLocalStorage(res.data);
					toast.success(res.message);
					navigate("/");
				}
			})
			.catch((err) => {
				toast.error(err.data.message);
			});
	};

	return (
		<div className='min-h-screen  flex items-center justify-center bg-gray-100'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white grid  place-content-center gap-10 border border-gray-200 p-20 rounded-xl drop-shadow-lg w-[500px]'
			>
				<h1 className='text-4xl font-semibold text-center'>Welcome</h1>
				<div className='grid gap-4 '>
					<input
						{...register("email", {
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
								message: "Please enter a valid email",
							},
							required: {
								value: true,
								message: "Email required",
							},
						})}
						placeholder='Email'
						className='appearance-none w-full h-11 rounded-md pl-3 border border-blue-500 focus:outline-none'
					/>
					<p className='text-red-500 text-sm '>
						{errors?.email?.message}
					</p>
					<input
						{...register("password", {
							required: {
								value: true,
								message: "Password required",
							},
						})}
						placeholder='Password'
						className='appearance-none w-full h-11 rounded-md pl-3 border border-blue-500 focus:outline-none'
						type='password'
					/>
					<p className='text-red-500 text-sm py-1'>
						{errors?.password?.message}
					</p>
				</div>
				<div>
					<p className='pb-2'>
						<span className='text-gray-400'>
							Don't have an account yet?.
						</span>
						<Link to='/register' className='cursor-pointer'>
							Sign up now
						</Link>
					</p>
					<button
						type='submit'
						disabled={isLoading}
						className='w-full h-11 bg-blue-500 rounded-md text-white hover:bg-blue-300 flex items-center justify-center disabled:opacity-50'
					>
						{isLoading ? <LoadingSpinner /> : "Login"}
					</button>
				</div>
			</form>
		</div>
	);
};
export default Login;
