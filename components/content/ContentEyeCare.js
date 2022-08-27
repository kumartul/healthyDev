import ContentItem from "./ContentItem";

import { AiFillEye } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { IoIosNotifications } from 'react-icons/io';

const ContentEyeCare = () => {
	return (
		<div>
			<ul>
				<ContentItem
					Icon={AiFillEye}
					description="We will help you to relax your eyes"
				/>
				<ContentItem
					Icon={BsFillClockFill}
					description="We will remind you every 20 minutes"
				/>
				<ContentItem
					Icon={IoIosNotifications}
					description="Get notified to do the eye exercise"
				/>
			</ul>
		</div>
	);
}

export default ContentEyeCare;
