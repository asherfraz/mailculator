import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { standardEvaluate } from "../../helper/evaluate";
import "../styles/removeArrows.css";
import { useDispatch } from "react-redux";
import { updateFromCalculations } from "../../redux/calculationsSlice";

const HistoryCard = ({
	id,
	note = "Calculation Note",
	expression = "Expression",
	result = "0",
	handleDelete,
}) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [noteEdit, setNoteEdit] = useState(note);
	const [expEdit, setExpEdit] = useState(expression);
	const [resEdit, setResEdit] = useState(result);

	const handleEdit = () => {
		const updatedResult = standardEvaluate(expEdit);
		if (updatedResult === null || updatedResult === "Error") {
			toast.error("Invalid expression!", {
				duration: 2000,
				position: "top-right",
				style: {
					background: "#f44336",
					color: "#fff",
				},
			});
			return;
		}

		if (note === noteEdit && result === resEdit) {
			toast.error("No changes made!", {
				duration: 2000,
				position: "top-right",
				style: {
					background: "#f44336",
					color: "#fff",
				},
			});
			return;
		}

		dispatch(
			updateFromCalculations({
				id,
				note: noteEdit,
				expression: expEdit,
				result: updatedResult,
			})
		);

		setResEdit(updatedResult);
		setIsOpen(false);
	};

	useEffect(() => {
		const updatedResult = standardEvaluate(expEdit);
		setResEdit(updatedResult);
	}, [expEdit]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			const isModalActive =
				document.activeElement.tagName === "DIV" &&
				document.activeElement.id === "editCalculation";

			if (isModalActive && isOpen && /^[0-9%+\-*/().]$/.test(e.key)) {
				e.preventDefault();
				setExpEdit((prev) => prev + e.key);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		//  Single History Card
		<div
			key={id}
			className="w-full bg-white/5 dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-3 shadow-sm"
		>
			<h3 className="italic mb-2 text-sm font-semibold dark:text-gray-400 ">
				{note === "" ? "Add Note" : note}
			</h3>

			<div className="flex flex-row items-end justify-end space-x-4">
				{/* Edit Icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className=" size-5 w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 hover:text-blue-400 cursor-pointer"
					onClick={() => {
						setIsOpen(true);
					}}
				>
					<path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
					<path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 s0-1.5H5.25Z" />
				</svg>
				{/* Copy Icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className=" size-5 w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 hover:text-blue-400 cursor-pointer"
					onClick={() => {
						navigator.clipboard.writeText(expression + " = " + result);
						toast.success("Calculation copied to clipboard!", {
							duration: 2000,
							position: "top-right",
							style: {
								background: "#333",
								color: "#fff",
							},
						});
					}}
				>
					<path
						fillRule="evenodd"
						d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
						clipRule="evenodd"
					/>
					<path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
					<path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
				</svg>
				{/* Share Icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className=" size-5 w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 hover:text-blue-400 cursor-pointer"
					onClick={() => {
						navigator.share({
							title: "Calculation",
							text: `\t\t*MailCulator*
----------------------------------------------------
*Calculation Note*: \n> *${note === "" ? "Empty Note" : note}* 
Expression: *${expression}*\nResult= \t*${result}*\n
> *${expression}* = *${result}*

----------------------------------------------------
\t\t\t\t_sent by *asherfraz.com*_`,
							// url: window.location.href,
						});
						toast.success("Calculation copied to clipboard!", {
							duration: 2000,
							position: "top-right",
							style: {
								background: "#333",
								color: "#fff",
							},
						});
					}}
				>
					<path
						fillRule="evenodd"
						d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
						clipRule="evenodd"
					/>
				</svg>

				{/* Delete ICon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className=" size-5 w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 hover:text-red-400 cursor-pointer"
					onClick={() => {
						handleDelete(id);
					}}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
					/>
				</svg>
			</div>

			{/* Expression and Result */}
			<div className="flex flex-col items-end space-y-1 border-t pt-2 dark:border-gray-700">
				{/* Expression*/}
				<p className="text-xl font-bold text-right break-words w-full direction-rtl">
					{expression}
				</p>

				{/* Result */}
				<p className="text-3xl font-bold">{result}</p>
			</div>

			{isOpen && (
				<div
					id="editCalculation"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
				>
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-semibold border-b-2 dark:border-blue-200 mb-4">
							Edit Calculation
						</h2>
						<p className="text-gray-700 dark:text-gray-200 mb-4">
							You can edit single calculation.
						</p>
						<div className="flex flex-col space-y-4">
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
									Updated Note:
								</label>
								<input
									type="text"
									className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									placeholder="Enter updated note"
									value={noteEdit}
									onChange={(e) => setNoteEdit(e.target.value)}
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
									Updated Expression:
								</label>
								<input
									type="text"
									className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white no-arrows"
									placeholder="Enter updated expression"
									value={expEdit}
									onChange={(e) => setExpEdit(e.target.value)}
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
									Updated Result:
								</label>
								<input
									type="text"
									className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white no-arrows"
									readOnly
									disabled
									value={resEdit}
								/>
							</div>
						</div>
						<div className="mt-4 flex items-end justify-end space-x-4">
							<button
								onClick={() => handleEdit()}
								className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg"
							>
								Update
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded-lg"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HistoryCard;
