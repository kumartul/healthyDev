import ContentItem from "./ContentItem";

import { AiFillCamera } from "react-icons/ai";
import { FaBrain } from "react-icons/fa";
import { IoIosNotifications } from 'react-icons/io';

const ContentBackCare = () => {
	return (
		<div>
			<ul>
				<ContentItem
					Icon={AiFillCamera}
					description="Take pictures of good and bad posture"
				/>
				<ContentItem
					Icon={FaBrain}
					description="App will learn the difference between them"
				/>
				<ContentItem
					Icon={IoIosNotifications}
					description="Get notified when your posture is not correct"
				/>
			</ul>
		</div>
	);
}

export default ContentBackCare;
