import { useState, useEffect } from "react";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
  
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export const options = {
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		title: {
			display: true,
			text: 'Eye Care Analysis'
		}
	}
}
  
export function LineChart() {
	const [eyeData, setEyeData] = useState([0, 0, 0, 0, 0, 0, 0]);

	useEffect(() => {
		let eyedata = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.EYE_DATA));
		setEyeData(eyedata);
	}, []);

	const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Eye Care Exercises Analysis",
				fill: true,
				data: eyeData,
				borderColor: "rgba(0, 153, 246, 0.5)",
				backgroundColor: "rgba(0, 153, 246, 0.2)",
				responsive: false
			}
		]
	};


	return (
		<Line
			data={data}
			options={options}
		/>
	);
}
  