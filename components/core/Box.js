import { Button } from '@mui/material';

const Box = ({ title, description, btnText, onClick }) => {
	return (
		<div className="bg-white p-3 m-3 border border-gray-200 rounded-xl dark:bg-[#111] dark:border-gray-500">
			<div>
				<h2 className="text-gray-700 text-2xl font-semibold mb-2 dark:text-gray-400">{title}</h2>
				<span className="text-gray-800 dark:text-gray-300">{description}</span>
			</div>

			<Button
				onClick={onClick}
				className="!bg-blue-500 !text-white !normal-case !my-3 w-full hover:!bg-blue-600"
			>
				{btnText}
			</Button>
		</div>
	);
}

export default Box;
