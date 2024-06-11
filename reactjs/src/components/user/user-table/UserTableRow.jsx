import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const UserTableRow = ({ user, onOpenDialog }) => {
	const navigate = useNavigate();
	const editHandler = (user) => {
		navigate("/user/create", { state: { user } });
	};

	return (
		<tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
			<th
				scope='row'
				className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-40'
			>
				{user?.name.toUpperCase()}
			</th>
			<td className='px-6 py-4 w-40'>{user?.email}</td>
			<td className='px-6 py-4 w-40'>{user?.phone}</td>
			<td className='px-6 py-4 w-40 '>{user?.address}</td>
			<td className='px-6 py-4 w-40 '>
				{user?.gender === "female" ? (
					<FontAwesomeIcon icon={faVenus} />
				) : (
					<FontAwesomeIcon icon={faMars} />
				)}
			</td>
			<td className='px-6 py-4 w-40'>
				{dayjs(user?.createdAt).format("DD/MM/YYYY")}
			</td>
			<td className='px-6 py-4 flex items-center gap-3 w-60'>
				<button
					onClick={() => editHandler(user)}
					className='bg-blue-500 text-white rounded-lg w-16 h-10'
				>
					Edit
				</button>
				<button
					onClick={() => onOpenDialog(user._id)}
					className='bg-rose-500 text-white rounded-lg w-16 h-10'
				>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default UserTableRow;
