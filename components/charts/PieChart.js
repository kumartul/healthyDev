import { useState, useEffect } from 'react';

import { 
	Chart as ChartJS, 
	ArcElement, 
	Tooltip, 
	Legend 
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { LOCAL_STORAGE_KEYS } from '../../utils/constants';

ChartJS.register(
	ArcElement, 
	Tooltip, 
	Legend
);
  
const PieChart = () => {
	const [badCount, setBadCount] = useState(0);
	const [goodCount, setGoodCount] = useState(0);

	useEffect(() => {
		const badPostureCount = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.BAD_POSTURE_COUNT));
		const goodPostureCount = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.GOOD_POSTURE_COUNT));

		if(badPostureCount) {
			setBadCount(badPostureCount);
		}
		if(goodPostureCount) {
			setGoodCount(goodPostureCount)
		}
	}, []);
	

	const data = {
		labels: ['Bad posture', 'Good posture'],
		datasets: [
			{
				label: '# count',
				data: [badCount, goodCount],
				backgroundColor: [
					'rgba(220, 38, 38, 0.7)',
					'rgba(0, 153, 246, 0.7)',
				
				],
				borderColor: [
					'rgba(220, 38, 38, 1)',
					'rgba(0, 153, 246, 1)',
				
				],
				borderWidth: 1,
			}
		],
	};

	if(badCount === 0 && goodCount === 0){
		return (
			<div className='flex flex-col flex-items-center justify-center h-full'>
				<p className='text-center'>Start using this feature to view the graph analysis here!</p>
			</div>
		);
	}

    return (
		<Pie data={data} />
    );
}

export default PieChart;
