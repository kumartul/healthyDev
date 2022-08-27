import Link from "next/link";

const SidebarItem = ({ href, Icon, title, isActive }) => {
	return (
		<Link href={href}>
			<li className={`mt-8 cursor-pointer transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg group ${isActive && 'bg-gray-200 dark:bg-gray-600'}`}>
				<div className="flex items-center space-x-2">
					<Icon className={`h-8 w-8 ${isActive ? 'text-blue-700' : 'text-blue-500'} group-hover:text-blue-600 transition-all duration-200`} />
					<span className={`${isActive ? 'text-blue-600' : 'text-blue-500'} text-semibold text-lg transition-all duration-200 group-hover:text-blue-600`}>{title}</span>
				</div>
			</li>
		</Link>
	);
}

export default SidebarItem;
