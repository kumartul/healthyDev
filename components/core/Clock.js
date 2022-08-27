const Clock = ({ minutes, seconds }) => {
	return (
		<div className="text-6xl text-gray-800 p-8 dark:text-gray-300">
			{minutes} : {seconds}
		</div>
	);
}

export default Clock;
