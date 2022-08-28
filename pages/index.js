import Head from "next/head";

import { useState, useEffect, useRef } from "react";

import Countdown, { zeroPad } from "react-countdown";

import { Button } from '@mui/material';

import Webcam from "react-webcam";

import Navbar from "../components/core/Navbar";
import Sidebar from "../components/core/Sidebar/Sidebar";
import Status from "../components/core/Status";
import Clock from "../components/core/Clock";
import Toggles from "../components/core/Toggle/Toggles";

import * as mobilenetModule from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as tf from "@tensorflow/tfjs";
import { model } from "@tensorflow/tfjs";

import { notify, notifyEar, notifySitStraight } from "../utils/notify";

import { setEarData } from "../utils/setEarData";

import {
	SIDEBAR_ITEMS,
	LOCAL_STORAGE_KEYS
} from "../utils/constants";

const renderer = ({ hours, minutes, seconds, completed }) => {
	return (
		<Clock
			minutes={zeroPad(minutes)}
			seconds={zeroPad(seconds)}
		/>
	);
}

const fromDatasetObject = (datasetObject) => {
	return Object.entries(datasetObject).reduce(
		(result, [indexString, { data, shape }]) => {
			const tensor = tf.tensor2d(data, shape);
			const index = Number(indexString);

			result[index] = tensor;

			return result;
		},
		{}
	);
}

const classifier = knnClassifier.create();

let i = 0;
let timeCounter = 1;

const Home = () => {
	const [time, setTime] = useState(10000);

	const [isStarted, setIsStarted] = useState(false);
	const [isPluggedOut, setIsPluggedOut] = useState();
	const [isCamOn, setIsCamOn] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const [earDeviceId, setEarDeviceId] = useState("");

	const [backOption, setBackOption] = useState(true);
	const [eyeOption, setEyeOption] = useState(true);
	const [soundOption, setSoundOption] = useState(false);

	const webcamRef = useRef(null);
	const timerRef = useRef(null);

	useEffect(() => {
		if(isCamOn) classifyPic();
	}, [isCamOn]);

	useEffect(() => {
		const eyeData = localStorage.getItem(LOCAL_STORAGE_KEYS.EYE_DATA);
		if(!eyeData) {
			localStorage.setItem(LOCAL_STORAGE_KEYS.EYE_DATA, JSON.stringify([0, 0, 0, 0, 0, 0, 0]));
		}

		const earData = localStorage.getItem(LOCAL_STORAGE_KEYS.EAR_DATA);
		if(!earData) {
			localStorage.setItem(LOCAL_STORAGE_KEYS.EAR_DATA, JSON.stringify([0, 0, 0, 0, 0, 0, 0]));
		}

		navigator.serviceWorker.register('sw.js');

		const str = localStorage.getItem(LOCAL_STORAGE_KEYS.MY_DATA);
		if(str) {
			classifier.setClassifierDataset(
				fromDatasetObject(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.MY_DATA)))
			);
		}
	}, []);

	useEffect(() => {
		if(eyeOption || backOption || soundOption) {
			setIsDisabled(false);
		}
		else {
			setIsDisabled(true);
		}
	}, [eyeOption, backOption, soundOption]);

	useEffect(() => {
		if(soundOption) {
			setIsPluggedOut(false);
			getLocalStream();
		}
	}, [soundOption]);

	const classifyPic = async () => {
		if(backOption) {
			try {
				const net = await mobilenetModule.load();

				const img = webcamRef.current.video;
				const activation = net.infer(img, true);
				const result = await classifier.predictClass(activation);

				setIsCamOn(false);

				if(result.label == 1) {
					notifySitStraight(window.location.href);

					let badPostureCount = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.BAD_POSTURE_COUNT));
					if(!badPostureCount) {
						badPostureCount = 0;
					}

					localStorage.setItem(LOCAL_STORAGE_KEYS.BAD_POSTURE_COUNT, badPostureCount + 1);
				}
				else {
					let goodPostureCount = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.GOOD_POSTURE_COUNT));
					if(!goodPostureCount) {
						goodPostureCount = 0;
					}

					localStorage.setItem(LOCAL_STORAGE_KEYS.GOOD_POSTURE_COUNT, goodPostureCount + 1);
				}
			}
			catch(err) {
				return;
			}
		}
	}

	const restart = () => {
		if(i === 0) {
			setTime(time + 1);

			i = 1;
		}
		else {
			setTime(time - 1);

			i = 0;
		}

		startHandler();
	}

	const startHandler = () => {
		const timerAPI = timerRef.current.getApi();
		timerAPI.start();

		setIsStarted(true);
	}

	const stopHandler = () => {
		const timerAPI = timerRef.current.getApi();
		timerAPI.stop();

		setIsStarted(false);
	}

	const onComplete = () => {
		if (backOption) {
			setIsCamOn(true);
		}
		if (eyeOption) {
			notify(window.location.href);
		}
		if (soundOption && timeCounter % 2 === 0 && !isPluggedOut) {
			notifyEar(window.location.href);

			setEarData();
		}

		timeCounter++;

		restart();
	}

	const getLocalStream = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then(stream => {
				setEarDeviceId(stream.getAudioTracks()[0].getSettings().deviceId);

				if(setEarDeviceId === 'default') {
					setEarDeviceId(stream.getAudioTracks()[0].getSettings().groupId);
				}

				navigator.mediaDevices.enumerateDevices().then(() => {
					const recorder = new MediaRecorder(stream);
					recorder.stream.getAudioTracks().forEach(track => {
						track.enabled = false;
					});
				})
			})
			.catch(()=> {
				setSoundOption(false);
			})
	}

	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

				<title>Home / HealthyDev</title>
			</Head>

			<header>
				<Navbar />
			</header>

			<main className="flex w-full">
				<Sidebar active={SIDEBAR_ITEMS.HOME} />

				<div className="flex-[0.55] border-x border-gray-300 m-4">
					<h2 className="text-3xl ml-10 font-semibold">Hello 👋</h2>

					<div className="flex flex-col p-16 border m-4 rounded-lg border-gray-300 dark:border-gray-100">
						<div className="flex items-center justify-between">
							<Countdown
								ref={timerRef}
								date={Date.now() + time * 60}
								autoStart={false}
								renderer={renderer}
								onComplete={onComplete}
							/>

							<Toggles
								backOption={backOption}
								setBackOption={setBackOption}
								eyeOption={eyeOption}
								setEyeOption={setEyeOption}
								soundOption={soundOption}
								setSoundOption={setSoundOption}
							/>
						</div>

						<div className="flex items-center justify-center space-x-2 text-center mt-8">
							<Button
								onClick={restart}
								disabled={isDisabled}
								className="flex-1 !bg-green-500 !text-white !normal-case hover:!bg-green-600"
							>
								Start
							</Button>

							<Button
								onClick={stopHandler}
								className="flex-1 !bg-red-500 !text-white !normal-case hover:!bg-red-600"
								disabled={!isStarted}
							>
								Stop
							</Button>
						</div>
					</div>

					{
						isCamOn && (
							<Webcam
								ref={webcamRef}
								screenshotFormat="image/jpeg"
								className="ml-auto mr-auto text-center z-[9] block"
								width={640}
								height={480}
							/>
						)
					}
				</div>

				<Status />
			</main>
		</div>
	);
}

export default Home;
