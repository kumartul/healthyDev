import SidebarItem from "./SidebarItem";

import {
	AiFillHome,
	AiFillEye
} from 'react-icons/ai';

import { FaAssistiveListeningSystems } from 'react-icons/fa';
import { MdEmojiPeople } from 'react-icons/md';

import { SIDEBAR_ITEMS } from "../../../utils/constants";

const Sidebar = ({ active }) => {
	return (
		<aside className="flex-[0.12] p-4 ml-auto">
			<ul>
				<SidebarItem href="/" Icon={AiFillHome} title="Home" isActive={SIDEBAR_ITEMS.HOME === active} />
				<SidebarItem href="/backcare" Icon={MdEmojiPeople} title="Back Care" isActive={SIDEBAR_ITEMS.BACK_CARE === active} />
				<SidebarItem href="/earcare" Icon={FaAssistiveListeningSystems} title="Ear Care" isActive={SIDEBAR_ITEMS.EAR_CARE === active} />
				<SidebarItem href="/eyecare" Icon={AiFillEye} title="Eye Care" isActive={SIDEBAR_ITEMS.EYE_CARE === active} />
			</ul>
		</aside>
	);
}

export default Sidebar;
