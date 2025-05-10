import React, { useEffect, useState } from "react";
import "./styles/removeArrows.css";
import { create, all } from "mathjs";
import { useDispatch } from "react-redux";
import { addToCalculations } from "../redux/calculationsSlice.js";

const StandardCalculator = () => {
	const dispatch = useDispatch();

	const [expression, setExpression] = useState("");
	const [result, setResult] = useState("");
	const [note, setNote] = useState("");

	const config = {};
	const math = create(all, config);

	const keypad = [
		["AC", "/", "*", "<="],
		["7", "8", "9", "-"],
		["4", "5", "6", "+"],
		["1", "2", "3", "="],
		["%", "0", "."],
	];

	const handleKeyPress = (key) => {
		// console.log("\n\nKey: ", key);
		// console.log("Expression: ", expression);
		// console.log("Result: ", result);

		if (key === "AC") {
			setExpression("");
			setResult("0");
			return;
		} else if (key === "<=" || key === "Backspace") {
			setExpression((prev) => prev.slice(0, -1));
			return;
		} else if (key === "=" || key === "Enter") {
			try {
				const trimmed = expression.trim();

				if (trimmed === "" || trimmed === "0") {
					alert("Empty expression can't be evaluated.");
					return;
				}

				const evaluated = math.evaluate(expression);
				setResult(evaluated);

				const tempCalculations = {
					note: note,
					expression: expression,
					result: evaluated,
				};

				dispatch(addToCalculations(tempCalculations));

				// Optionally clear input
				setNote("");
				setExpression("");
				setResult("0");
			} catch (err) {
				setResult("Error");
			}
			return;
		} else if (/^[0-9%+\-*()/.]$/.test(key)) {
			setExpression((prev) => prev + key);
			return;
		}
	};

	useEffect(() => {
		try {
			if (expression.trim() === "") {
				setResult("0");
				return;
			}
			const evaluated = math.evaluate(expression);
			setResult(evaluated);
		} catch (err) {
			setResult("Error");
		}
	}, [expression]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			// Prevent interfering when user is typing a note
			if (
				document.activeElement.tagName === "INPUT" &&
				document.activeElement.id === "note"
			)
				return;

			if (
				document.activeElement.tagName === "INPUT" &&
				document.activeElement.id === "expression"
			) {
				if ((e.ctrlKey && e.key === "Backspace") || e.key === "Delete") {
					// (Ctrl + Backspace), Delete, Escape to clear
					setExpression("");
					setResult("0");
					return;
				}
				if (e.key === "Escape") {
					setNote("");
					setExpression("");
					setResult("0");
					return;
				}

				// (Shift + N) -> Focus note input
				if (e.shiftKey && e.key.toLowerCase() === "n") {
					e.preventDefault(); // Prevent browser default
					const noteInput = document.getElementById("note");
					if (noteInput) noteInput.focus();
					return;
				}

				if (e.key === "Enter") {
					e.preventDefault();
					handleKeyPress("=");
					return;
				}

				if (/^[0-9%+\-*()/.]$/.test(e.key)) {
					e.preventDefault();
					setExpression((prev) => prev + e.key);
					return;
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [expression, note, result]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-full  rounded-lg shadow-lg">
			{/* Display Result */}
			<div className="flex flex-col items-start justify-around w-full h-full  rounded-lg shadow-lg p-4">
				<div className="w-full h-fit flex-col items-center justify-start mb-2">
					<label htmlFor="note" className="text-lg font-semibold ml-1">
						Note:
					</label>
					<input
						type="text"
						id="note"
						name="note"
						value={note}
						label="Note"
						onChange={(e) => setNote(e.target.value)}
						placeholder="Add a Note for this calculation"
						dir="ltr"
						className="w-full h-18 text-2xl focus:outline-none outline-blue-600 caret-blue-600 border-2 p-2 rounded-lg font-semibold placeholder-gray-400 dark:placeholder-white/70  no-arrows"
					/>
					<p dir="rtl" className="text-[12px] text-gray-500 dark:text-white/70">
						Press Enter to add to history
					</p>
				</div>
				<input
					type="text"
					id="expression"
					name="expression"
					value={expression}
					readOnly
					placeholder="Expression"
					dir="rtl"
					className="w-full h-22 text-4xl focus:outline-none font-semibold text-gray-900 dark:text-white mb-2 placeholder-gray-400 dark:placeholder-white/70  no-arrows"
				/>
				{/* <input
					type="text"
					value={result}
					disabled
					placeholder="Result"
					dir="rtl"
					className="w-full text-shadow-lg h-22 text-6xl focus:outline-none font-bold text-gray-900 dark:text-white  no-arrows"
                    /> */}
				<p
					dir="rtl"
					className="w-full text-shadow-lg h-20 text-6xl focus:outline-none font-bold text-gray-900 dark:text-white  no-arrows"
				>
					{result}
				</p>
			</div>

			<div
				tabIndex={0}
				className="flex flex-col items-center justify-center w-full h-full  rounded-lg shadow-lg p-4 mt-2"
			>
				{keypad.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className="grid grid-cols-4 gap-2 w-full h-fit m-2 relative"
					>
						{row.map((key, keyIndex) => (
							<button
								key={keyIndex}
								className={`${
									key === "="
										? "absolute top-0 h-full bg-cyan-500 hover:bg-cyan-600"
										: "h-16"
								} 
                                ${
																	key === "AC"
																		? "bg-red-500 hover:bg-red-600"
																		: ""
																}
                                ${
																	["/", "*", "-", "+", "<="].includes(key)
																		? "bg-gray-700 hover:bg-gray-800"
																		: "bg-blue-500"
																} 
                                text-4xl text-shadow-lg flex items-center justify-center w-full 
                                text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out`}
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
								{key === "<=" ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-8 w-full"
									>
										<path
											fillRule="evenodd"
											d="M2.515 10.674a1.875 1.875 0 0 0 0 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374ZM12.53 9.22a.75.75 0 1 0-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L15.31 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									key
								)}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default StandardCalculator;
