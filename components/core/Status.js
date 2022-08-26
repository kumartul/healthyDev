import React from 'react';

import Image from 'next/image';

const Status = () => {
    return (
		<div className="flex-[0.25] flex flex-col items-center">
			<Image
				src="/assets/images/success.png"
				alt="You're taking good care of your health"
				width={250}
				height={250}
			/>

			<h2 className="text-gray-700 dark:text-gray-200 text-2xl font-semibold text-center">You are taking good care of your health!</h2>
		</div>
    );
}

export default Status;
