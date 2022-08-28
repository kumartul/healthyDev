import Toggle from "./Toggle";

const Toggles = ({ backOption, setBackOption, eyeOption, setEyeOption, soundOption, setSoundOption }) => {
	return (
		<div>
			<Toggle
				title="Back"
				checked={backOption}
				onChange={() => setBackOption(!backOption)}
			/>

			<Toggle
				title="Eye"
				checked={eyeOption}
				onChange={() => setEyeOption(!eyeOption)}
			/>

			<Toggle
				title="Sound"
				checked={soundOption}
				onChange={() => setSoundOption(!soundOption)}
			/>
		</div>
	);
}

export default Toggles;
