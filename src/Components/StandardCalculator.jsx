import React, { useEffect, useState } from "react";
import "./styles/removeArrows.css";

const StandardCalculator = () => {
	const [expression, setExpression] = useState("");
	const [result, setResult] = useState("");
	const [note, setNote] = useState("");

	const keypad = [
		["AC", "/", "*", "<="],
		["7", "8", "9", "-"],
		["4", "5", "6", "+"],
		["1", "2", "3", "="],
		["%", "0", "."],
	];

	const handleKeyPress = (key) => {
		console.log(key);
		console.log("updated: ", expression);
		if (key === "AC") {
			setExpression("");
			setResult("");
		} else if (key === "<=") {
			setExpression((prev) => prev.slice(0, -1));
		} else if (key === "=") {
			const result = eval(expression);
			setResult(result.toString());
		} else {
			setExpression((prev) => (prev === null ? key : prev + key));
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full  rounded-lg shadow-lg p-2">
			{/* Display Result */}
			<div className="flex flex-col items-center justify-end w-full h-full  rounded-lg shadow-lg p-5">
				<input
					type="text"
					id="note"
					name="note"
					value={note}
					label="Note"
					onChange={(e) => setNote(e.target.value)}
					placeholder="Add a Note for this calculation"
					dir="ltr"
					className="w-full h-18 text-3xl focus:outline-none border-2 p-2 rounded-lg font-semibold  text-gray-900 dark:text-white mb-2 no-arrows"
				/>
				<input
					type="text"
					id="expression"
					name="expression"
					value={expression}
					placeholder="Expression"
					dir="rtl"
					className="w-full h-24 text-4xl focus:outline-none font-semibold text-gray-900 dark:text-white mb-2 no-arrows"
				/>
				<input
					type="text"
					id="result"
					name="result"
					value={result}
					disabled
					placeholder="Result"
					dir="rtl"
					className="w-full h-22 text-6xl focus:outline-none font-bold text-gray-900 dark:text-white  no-arrows"
				/>
			</div>
			{/* 
			<div className="flex flex-col items-center justify-center w-full h-full  rounded-lg shadow-lg p-4 mt-2">
				{keypad.map((row, rowIndex) => (
					<div
						key={rowIndex}
						// className="flex flex-row justify-between items-center w-full h-fit"
						className="grid grid-cols-4 gap-2 w-full h-fit m-2 relative"
					>
						{row.map((key, keyIndex) => (
							<button
								key={keyIndex}
								className={`${
									// key === "=" ? "min:w-[12px] h-[8rem] " : ""
									key === "=" ? "row-span-2 " : ""
								} text-4xl text-shadow-lg flex items-center justify-center w-full h-16 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out`}
								onClick={() => {
									handleKeyPress(key);
								}}
							>
								{key}
							</button>
						))}
					</div>
				))}
			</div> */}

			<div className="flex flex-col items-center justify-center w-full h-full  rounded-lg shadow-lg p-4 mt-2">
				{keypad.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className="grid grid-cols-4 gap-2 w-full h-fit m-2 relative"
					>
						{row.map((key, keyIndex) => (
							<button
								key={keyIndex}
								className={`${
									key === "=" ? "absolute top-0 h-full bg-[#00ffff]" : "h-16"
								} text-4xl text-shadow-lg flex items-center justify-center w-full bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out`}
								style={
									key === "="
										? {
												gridRow: 2,
												gridColumn: 4,
												height: "9rem",
												top: "-4rem",
										  }
										: {}
								}
								onClick={() => {
									handleKeyPress(key);
								}}
							>
								{key}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default StandardCalculator;
