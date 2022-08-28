import Head from "next/head";
import { useRouter } from "next/router";

import { useState } from "react";

import Navbar from "../components/core/Navbar";
import Sidebar from "../components/core/Sidebar/Sidebar";
import Box from "../components/core/Box";
import Modal from "../components/core/Modal";
import PieChart from "../components/charts/PieChart";

import ContentBackCare from "../components/content/ContentBackCare";

import { SIDEBAR_ITEMS } from "../utils/constants";

const BackCare = () => {
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	const onClick = () => {
		setShowModal(!showModal);
	}

	const redirectToTrainBackCare = () => {
		router.push("/trainbackcare");
	}

	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

				<title>Back Care / HealthyDev</title>
			</Head>

			<header>
				<Navbar />
			</header>

			<main className="flex w-full">
				<Sidebar active={SIDEBAR_ITEMS.BACK_CARE} />

				<div className="flex-[0.55]">
					<h2 className="text-3xl font-semibold ml-8 py-8">Back Care</h2>
					<PieChart />
				</div>

				<div className="flex-[0.25]">
					<Box
						title="How it works?"
						description="Find out how this feature works"
						btnText="Find out"
						onClick={onClick}
					/>
					<Box
						title="Take new pictures"
						description="Helps the app to determine whether your posture is correct or not"
						btnText="Take Pics"
						onClick={redirectToTrainBackCare}
					/>
				</div>
			</main>

			{
				showModal && (
					<Modal
						onClick={onClick}
						title="Back Care"
						Content={ContentBackCare}
						onClose={onClick}
					/>
				)
			}
		</div>
	);
}

export default BackCare;
