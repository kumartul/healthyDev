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
				{/* Required meta tags */}
				<meta charset="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content="Take care of your health as a developer" />
				<meta name="keywords" content="health healthy developer care dev devhealth healthydev ear eye back earcare eyecare backcare" />
				<meta name="author" content="Atul Kumar" />

				{/* Open Graph Meta Tags */}
				<meta property="og:title" content="HealthyDev 🩺" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://healthy-dev-beta.vercel.app" />
				<meta property="og:image" content="https://healthy-dev-beta.vercel.app/mockup.png" />
				<meta property="og:description" content="Take care of your health as a developer" />
				<meta property="og:site_name" content="HealthyDev" />
				<meta property="og:locale" content="en_US" />

				{/* Twitter Meta Tags */}
				<meta property="twitter:card" content="summary" />
				<meta property="twitter:title" content="HealthyDev" />
				<meta property="twitter:description" content="Take care of your health as a developer" />
				<meta property="twitter:image" content="https://healthy-dev-beta.vercel.app/mockup.png" />
				<meta property="twitter:image:alt" content="HealthyDev Home Page" />
				<meta property="twitter:site" content="@kumartul001" />
				<meta property="twitter:creator" content="@kumartul001" />

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
