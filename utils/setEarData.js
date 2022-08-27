import { LOCAL_STORAGE_KEYS } from "./constants"

export const setEarData = () => {
	let earData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.EAR_DATA));
	if(!earData) {
		earData = [0, 0, 0, 0, 0, 0, 0];
	}

	const todaysDate = new Date();
	const today = todaysDate.getDay();

	earData[today] = Number(earData[today]) + 40;

	localStorage.setItem(LOCAL_STORAGE_KEYS.EAR_DATA, JSON.stringify(earData));
}
