import {
	Button,
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { useDeleteUserMutation } from "pages/user/feature/userApi";
import { toast } from "sonner";

export default function MyModal({ userId, open, onOpen, onClose }) {
	const [deleteUser] = useDeleteUserMutation();
	const deleteHandler = async () => {
		const result = await deleteUser(userId);

		if (result.data.success) {
			toast.success(result.data.message);
			onClose();
		}
	};

	return (
		<>
			<Transition appear show={open}>
				<Dialog
					as='div'
					className='relative z-10 focus:outline-none'
					onClose={onClose}
					__demoMode
				>
					<div className='fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50'>
						<div className='flex min-h-full items-center justify-center p-4'>
							<TransitionChild
								enter='ease-out duration-300'
								enterFrom='opacity-0 transform-[scale(95%)]'
								enterTo='opacity-100 transform-[scale(100%)]'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 transform-[scale(100%)]'
								leaveTo='opacity-0 transform-[scale(95%)]'
							>
								<DialogPanel className='w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl'>
									<DialogTitle
										as='h3'
										className='text-xl font-medium text-black'
									>
										Are you sure you want to delete?
									</DialogTitle>
									<p className='mt-2 text-sm/6 text-black'>
										This process can't be undone
									</p>
									<div className='mt-4 flex items-center justify-end gap-3'>
										<Button
											className='inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-black  shadow-inner shadow-white/10 focus:outline-none data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'
											onClick={onClose}
										>
											Cancel
										</Button>
										<Button
											className='inline-flex items-center gap-2 rounded-md bg-blue-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'
											onClick={deleteHandler}
										>
											Continue
										</Button>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
