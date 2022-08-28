const Toggle = ({ title, checked, onChange }) => {
	return (
		<div className="flex items-center space-x-8 relative">
			<div className="text-lg">{title} Care: </div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={checked}
						onChange={onChange}
						className="absolute right-0 top-[7px] w-5 h-5 cursor-pointer"
					/>
				</label>
			</div>
		</div>
	);
}

export default Toggle;
