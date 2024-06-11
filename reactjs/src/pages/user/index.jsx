import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./feature/userApi.js";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserNavbar from "components/user/UserNavbar.jsx";
import MyModal from "components/modal/ConfirmationModal.jsx";
import UserTable from "components/user/user-table/UserTable.jsx";

const User = () => {
	const [activePage, setActivePage] = useState(1);
	const [openDialog, setOpenDialog] = useState(false);
	const [userId, setUserId] = useState(null);

	const handleOpenDialog = (id) => {
		setOpenDialog(true);
		setUserId(id);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const { user, token } = useSelector((state) => state.loginSlice);

	const { data } = useGetUsersQuery({
		page: activePage,
		search: "",
		entriesPerPage: 5,
	});

	const userList = data?.data?.users;

	const handlePageChange = (e) => {
		setActivePage(e.selected + 1);
	};

	return (
		<div className='App'>
			<UserNavbar />
			<div className='container min-h-screen flex items-center justify-center'>
				<div className='flex flex-col items-end gap-10'>
					<Link
						to='/user/create'
						className='bg-green-400 w-24 h-11 flex items-center justify-center rounded-3xl text-white'
					>
						Create
					</Link>

					<div className='relative  shadow-md sm:rounded-lg'>
						<UserTable
							userList={userList}
							onOpenDialog={handleOpenDialog}
						/>
						<ReactPaginate
							previousLabel='<'
							nextLabel='>'
							breakLabel='...'
							breakClassName='dark:text-primary-dark'
							pageRangeDisplayed={2}
							marginPagesDisplayed={1}
							pageCount={Math.ceil(
								(data?.data?.total_results - 1) / 5
							)}
							forcePage={activePage - 1}
							onPageChange={handlePageChange}
							containerClassName='flex items-center gap-x-4 p-3 '
							previousClassName='rounded-md bg-gray-200 '
							previousLinkClassName='p-3 py-1 block'
							nextClassName='rounded-md bg-gray-200 '
							nextLinkClassName='p-3 py-1 block'
							pageClassName=' rounded-md bg-gray-200'
							pageLinkClassName='p-3 py-1 block '
							activeClassName='!bg-custom-primary text-white '
						/>
					</div>
				</div>
			</div>

			<MyModal
				open={openDialog}
				onOpen={handleOpenDialog}
				onClose={handleCloseDialog}
				userId={userId}
			/>
		</div>
	);
};

export default User;
