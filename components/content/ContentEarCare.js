import ContentItem from "./ContentItem";

import { AiOutlineLineChart } from "react-icons/ai";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import { IoIosNotifications } from 'react-icons/io';

const ContentEarCare = () => {
	return (
		<div>
			<ul>
				<ContentItem
					Icon={FaAssistiveListeningSystems}
					description="It is recommended to use earphones max for 60 minutes per day"
				/>
				<ContentItem
					Icon={IoIosNotifications}
					description="Get notified when you react the time limit"
				/>
				<ContentItem
					Icon={AiOutlineLineChart}
					description="Your earphone usage time will be visualised through chart"
				/>
			</ul>
		</div>
	);
}

export default ContentEarCare;
