import Head from "next/head";

import { useState } from "react";

import Navbar from "../components/core/Navbar";
import Sidebar from "../components/core/Sidebar/Sidebar";
import Box from "../components/core/Box";
import Modal from "../components/core/Modal";
import BarChart from "../components/charts/BarChart";

import ContentEarCare from "../components/content/ContentEarCare";
import ContentEarExercise from "../components/content/ContentEarExercise";

import { SIDEBAR_ITEMS } from "../utils/constants";

const EarCare = () => {
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

				<title>Ear Care / HealthyDev</title>
			</Head>

			<header>
				<Navbar />
			</header>

			<main className="flex w-full !h-4/5">
				<Sidebar active={SIDEBAR_ITEMS.EAR_CARE} />

				<div className="flex-[0.55] !h-4/5">
					<h2 className="text-3xl font-semibold ml-8 py-8">Ear Care</h2>
					<BarChart />
				</div>

				<div className="flex-[0.25]">
					<Box
						title="How it works?"
						description="Find out how this feature works"
						btnText="Find out"
						onClick={onClick1}
					/>
					<Box
						title="Ear Exercise"
						description="Get to know some ear exercises to take care of your ears"
						btnText="Find out"
						onClick={onClick2}
					/>
				</div>
			</main>

			{
				showModal1 && (
					<Modal
						onClick={onClick1}
						title="Ear Care"
						Content={ContentEarCare}
						onClose={onClick1}
					/>
				)
			}
			{
				showModal2 && (
					<Modal
						onClick={onClick2}
						title="Ear Exercises"
						Content={ContentEarExercise}
						onClose={onClick2}
					/>
				)
			}
		</div>
	);
}

export default EarCare;
