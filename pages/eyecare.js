import Head from "next/head";

import { useState } from "react";

import Navbar from "../components/core/Navbar";
import Sidebar from "../components/core/Sidebar/Sidebar";
import Box from "../components/core/Box";
import Modal from "../components/core/Modal";
import { LineChart } from "../components/charts/LineChart";

import ContentEyeCare from "../components/content/ContentEyeCare";
import ContentEyeExercise from "../components/content/ContentEyeExercise";

import { SIDEBAR_ITEMS } from "../utils/constants";

const EyeCare = () => {
	const [showModal1, setShowModal1] = useState(false);
	const [showModal2, setShowModal2] = useState(false);

	const onClick1 = () => {
		setShowModal1(!showModal1);
	}

	const onClick2 = () => {
		setShowModal2(!showModal2);
	}

	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

				<title>Eye Care / HealthyDev</title>
			</Head>

			<header>
				<Navbar />
			</header>

			<main className="flex w-full">
				<Sidebar active={SIDEBAR_ITEMS.EYE_CARE} />

				<div className="flex-[0.55]">
					<h2 className="text-3xl font-semibold ml-8 py-8">Eye Care</h2>
					<LineChart />
				</div>

				<div className="flex-[0.25]">
					<Box
						title="How it works?"
						description="Find out how this feature works"
						btnText="Find out"
						onClick={onClick1}
					/>
					<Box
						title="Eye Exercise"
						description="Get to know some eye exercises to relax your eyes"
						btnText="Find out"
						onClick={onClick2}
					/>
				</div>
			</main>

			{
				showModal1 && (
					<Modal
						onClick={onClick1}
						title="Eye Care"
						Content={ContentEyeCare}
						onClose={onClick1}
					/>
				)
			}
			{
				showModal2 && (
					<Modal
						onClick={onClick2}
						title="Eye Exercise"
						Content={ContentEyeExercise}
						onClose={onClick2}
					/>
				)
			}
		</div>
	);
}

export default EyeCare;
