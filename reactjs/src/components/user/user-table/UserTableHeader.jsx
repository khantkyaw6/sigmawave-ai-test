import React from "react";

const UserTableHeader = () => {
	return (
		<thead className='text-xs  w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
			<tr>
				<th scope='col' className='px-6 py-3 w-40'>
					Name
				</th>
				<th scope='col' className='px-6 py-3 w-40 '>
					Email
				</th>
				<th scope='col' className='px-6 py-3 w-40'>
					Phone
				</th>
				<th scope='col' className='px-6 py-3 w-40'>
					Address
				</th>
				<th scope='col' className='px-6 py-3 w-40'>
					Gender
				</th>
				<th scope='col' className='px-6 py-3 w-40'>
					Created Date
				</th>
				<th scope='col' className='px-6 py-3 w-40'>
					Action
				</th>
			</tr>
		</thead>
	);
};

export default UserTableHeader;
