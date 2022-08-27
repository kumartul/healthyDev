const ContentItem = ({ Icon, description }) => {
	return (
		<li className="flex items-center space-x-2 mb-2">
			<Icon className="h-6 w-6 text-blue-500" />
			<span className="text-gray-800 font-semibold text-md">{description}</span>
		</li>
	);
}

export default ContentItem;
