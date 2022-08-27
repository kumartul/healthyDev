import ContentItem from "./ContentItem";

import {
	BsFillClockFill,
	BsFillVolumeUpFill
} from "react-icons/bs";

const ContentEarCare = () => {
	return (
		<div>
			<h3 className="text-lg font-bold text-gray-700 mb-4">Follow the 60-60 rule!</h3>
			<ul>
				<ContentItem
					Icon={BsFillClockFill}
					description="Use earphones maximum for 60 minutes per day"
				/>
				<ContentItem
					Icon={BsFillVolumeUpFill}
					description="Keep the volume 60% maximum"
				/>
			</ul>
		</div>
	);
}

export default ContentEarCare;
