import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { clearLocalStorage } from "utils/localStorage";
import Logo from "../../assets/images/fav.jpg";
import { clearUserData } from "../../pages/login/feature/loginSlice.js";

const UserNavbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		clearLocalStorage("user");
		dispatch(clearUserData());
		navigate("/login");
	};

	const editHandler = () => {
		navigate("/user/password");
	};

	return (
		<div>
			<nav className='bg-white border-gray-200 dark:bg-gray-900'>
				<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
					<a className='flex items-center space-x-3 rtl:space-x-reverse'>
						<img
							src={Logo}
							className='h-8 w-8'
							alt='Flowbite Logo'
							width={20}
							height={20}
						/>
						<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
							User System
						</span>
					</a>
					<div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
						<div className=' text-right'>
							<Menu>
								<MenuButton className='inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
									Options
								</MenuButton>
								<Transition
									enter='transition ease-out duration-75'
									enterFrom='opacity-0 scale-95'
									enterTo='opacity-100 scale-100'
									leave='transition ease-in duration-100'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-95'
								>
									<MenuItems
										anchor='bottom end'
										className='w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none'
									>
										<MenuItem>
											<button
												onClick={editHandler}
												className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
											>
												Change Password
												<kbd className='ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline'>
													⌘E
												</kbd>
											</button>
										</MenuItem>
										<div className='my-1 h-px bg-black' />
										<MenuItem>
											<button
												onClick={logoutHandler}
												className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold transition duration-150 ease-in-out data-[focus]:bg-red-800'
											>
												SIGNOUT
												<kbd className='ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline'>
													⌘A
												</kbd>
											</button>
										</MenuItem>
									</MenuItems>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default UserNavbar;
