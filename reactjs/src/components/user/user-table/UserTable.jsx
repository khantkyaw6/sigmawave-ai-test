import React from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import { useSelector } from "react-redux";

const UserTable = ({ userList, onOpenDialog }) => {
	const { user } = useSelector((state) => state.loginSlice);
	const filterUserList = userList?.filter((users) => users._id !== user._id); // Filter current login user

	return (
		<div className=' min-h-[434px] '>
			<table className='w-full  table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<UserTableHeader />
				<tbody className='w-full'>
					{filterUserList?.length > 0 ? (
						filterUserList?.map((user) => (
							<UserTableRow
								key={user._id}
								user={user}
								onOpenDialog={onOpenDialog}
							/>
						))
					) : (
						<tr>
							<td
								colSpan={7}
								className='text-center font-bold text-lg text-gray-500  items-center py-16  justify-center '
							>
								No User Found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default UserTable;
