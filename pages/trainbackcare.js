import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from 'react';

import Navbar from "../components/core/Navbar";
import Modal from "../components/core/Modal";

import ContentCameraError from "../components/content/ContentCameraError";

import { Button } from "@mui/material";

import Webcam from "react-webcam";

import * as mobilenetModule from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { model } from "@tensorflow/tfjs";

import { LOCAL_STORAGE_KEYS } from "../utils/constants";

const toDatasetObject = async dataset => {
	const result = await Promise.all(Object.entries(dataset).map(async ([classId, value]) => {
		const data = await value.data();

		return {
			label: classId,
			data: [...data],
			shape: value.shape
		}
	}));

	return result;
}

const classifier = knnClassifier.create();

const TrainBackCare = () => {
	const [isError, setIsError] = useState(false);
	const [isTrained, setIsTrained] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const [goodPicsCount, setGoodPicsCount] = useState(0);
	const [badPicsCount, setBadPicsCount] = useState(0);

	const [saving, setSaving] = useState(false);
	const [result, setResult] = useState(null);

	const webcamRef = useRef(null);

	const router = useRouter();

	const trainModel = async classId => {
		setSaving(true);

		const img = webcamRef.current.video;

		const mobilenet = await mobilenetModule.load();
		const activation = mobilenet.infer(img, true);

		classifier.addExample(activation, classId);

		setSaving(false);

		if(classId === 'good') {
			setGoodPicsCount(goodPicsCount + 1);

			localStorage.setItem(LOCAL_STORAGE_KEYS.GOOD_POSTURE_COUNT, goodPicsCount);
		}
		else {
			setBadPicsCount(badPicsCount + 1);
			
			localStorage.setItem(LOCAL_STORAGE_KEYS.BAD_POSTURE_COUNT, badPicsCount);
		}
	}

	const saveModel = async () => {
		const dataset = classifier.getClassifierDataset();
		const datasetObj = await toDatasetObject(dataset);

		const datasetJson = JSON.stringify(datasetObj);
		localStorage.setItem(LOCAL_STORAGE_KEYS.MY_DATA, datasetJson);

		setIsTrained(true);
	}

	const classifyPic = async () => {
		setResult("Checking if your posture is correct...");

		const img = webcamRef.current.video;

		const net = await mobilenetModule.load();
		const activation = net.infer(img, true);

		const result = await classifier.predictClass(activation);

		setResult(result.label);
	}

	const showError = () => {
		setIsError(true);
	}

	useEffect(() => {
		if(goodPicsCount >= 3 && badPicsCount >= 3) {
			setIsDisabled(false);
		}
	}, [goodPicsCount, badPicsCount]);

	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

				<title>Train Back Care / HealthyDev</title>
			</Head>

			<header>
				<Navbar />
			</header>

			<main className="flex w-[75%] m-auto items-center justify-between">
				<div className="">
					<h2 className="text-3xl font-semibold p-3">Teach this App 🧑‍🏫</h2>
					<h3 className="text-lg px-3 ">Teach this app the difference between good posture and bad posture</h3>

					<Webcam
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						onUserMediaError={showError}
						className="ml-auto mr-auto text-center z-[9] w-[640px] h-[480px] block border"
					/>
				</div>

				<div className="flex flex-col items-center justify-center space-y-4">
					{
						saving && (
							<div className="mb-4">
								App is learning about your posture...
							</div>
						)
					}
					<Button
						onClick={() => trainModel('good')}
						className="!relative !bg-green-500 !text-white !normal-case !text-lg w-[350px] rounded-sm hover:!bg-green-600"
					>
						Capture Good Posture <span className="absolute right-3">{goodPicsCount}</span>
					</Button>

					<Button
						onClick={() => trainModel('bad')}
						className="!relative !bg-red-500 !text-white !normal-case !text-lg w-[350px] rounded-sm hover:!bg-red-600"
					>
						Capture Bad Posture <span className="absolute right-3">{badPicsCount}</span>
					</Button>

					<Button
						onClick={() => saveModel()}
						disabled={isDisabled}
						className="!relative !bg-blue-500 !text-white !normal-case !text-lg w-[350px] rounded-sm hover:!bg-blue-600"
					>
						Done
					</Button>

					{
						isTrained && (
							<Button
								onClick={() => classifyPic()}
								className="!normal-case text-gray-700 font-semibold text-[15px] dark:text-gray-300"
							>
								Test Posture
							</Button>
						)
					}
					{
						isTrained && result && (
							<div className="!normal-case">
								{result}
							</div>
						)
					}
					{
						isTrained && (
							<Link href="/">
								<span className="underline cursor-pointer text-blue-500 hover:text-blue-600">Back to Home</span>
							</Link>
						)
					}
				</div>
				
				{
					isError && (
						<Modal 
							title="Error"
							Content={ContentCameraError}
							hideCloseBtn
							onClick={() => router.push('/')}
							btnText='Back to Home'
						/>
					)
				}
			</main>
		</div>
	);
}

export default TrainBackCare;
