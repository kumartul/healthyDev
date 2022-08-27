import Link from "next/link";

import {
	AiFillHome,
	AiFillEye
} from 'react-icons/ai';

import { IoEarSharp } from 'react-icons/io';
import { MdEmojiPeople } from 'react-icons/md';

const Sidebar = () => {
	return (
		<aside>
			<ul>
				<Link href="/">
					<li>
						<span>Home</span>
					</li>
				</Link>
				<Link href="/backcare">
					<li>
						<span>Back Care</span>
					</li>
				</Link>
				<Link href="/eyecare">
					<li>
						<span>Eye Care</span>
					</li>
				</Link>
				<Link href="/earcare">
					<li>
						<span>Ear Care</span>
					</li>
				</Link>
			</ul>
		</aside>
	);
}

export default Sidebar;
