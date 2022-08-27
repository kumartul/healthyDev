import { Button } from '@mui/material';

import { GrClose } from 'react-icons/gr';

const Modal = ({ onClick, onClose, title, Content }) => {
	return (
		<div>
			<div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-50"></div>
			<div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
				<div className="relative h-[40vh] w-[30vw] bg-white !opacity-100 rounded-lg z-10 p-10">
					<GrClose
						onClick={onClose}
						className="absolute right-0 top-0 m-4 cursor-pointer text-gray-800"
					/>

					<h2 className="text-gray-800 font-semibold text-2xl mb-4">{title}</h2>

					<Content />

					<Button
						onClick={onClick}
						className="bg-blue-500 text-white normal-case absolute right-0 bottom-0 m-4 hover:bg-blue-600"
					>
						Done
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
