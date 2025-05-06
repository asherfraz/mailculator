import React from "react";
import { useTheme } from "../ThemeContext";
import Drawer from "../Components/Drawer";
import StandardCalculator from "../Components/StandardCalculator";
import HistoryCard from "../Components/HistoryCard.jsx/HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCalculations,
	removeFromCalculations,
} from "../redux/calculationsSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Standard = () => {
	const { theme, toggleTheme } = useTheme();
	const dispatch = useDispatch();
	const calculations = useSelector((state) => state.calculations.calculation);

	const handleDelete = (id) => {
		dispatch(removeFromCalculations(id));
	};

	const menuItems = [
		{ name: "Standard", path: "/" },
		{ name: "Scientific", path: "/scientific" },
		{ name: "Currency", path: "/currency" },
	];

	return (
		<div className=" dark:bg-gray-800 dark:text-white w-full h-[91vh] px-6 flex flex-row justify-center items-center">
			{/* Drawer */}
			<div className="hidden w-[40%] h-full md:flex flex-col items-center dark:bg-black/10 p-1.5 rounded-lg shadow-lg">
				{/* Drawer Header */}
				<div className="flex flex-col items-start justify-center space-y-1 space-x-4 w-full py-4 border-b-2 dark:border-gray-700">
					<h2 className="text-lg font-semibold dark:text-white font-mono">
						Config:
					</h2>
					<div className="flex flex-col justify-center space-y-1 space-x-4 w-full py-4 border-b-2 dark:border-gray-700">
						<button
							className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white/80"
							onClick={() => {
								toggleTheme();
							}}
						>
							{theme === "light" ? (
								<>
									Dark Theme
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="ml-[2px] size-4"
									>
										<path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
										<path
											fillRule="evenodd"
											d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
											clipRule="evenodd"
										/>
									</svg>
								</>
							) : (
								<>
									Light Theme
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="ml-[2px] size-4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
										/>
									</svg>
								</>
							)}
						</button>
						<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white/80">
							Send as E-mail
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="ml-1 size-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
								/>
							</svg>
						</button>
						<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white/80">
							Send as Whatsapp
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								// strokeWidth={1.5}
								// stroke="currentColor"
								className="ml-1 size-4 dark:bg-white/80 dark:rounded-xl text-white/80 dark:hover:text-white/80"
							>
								<title>WhatsApp</title>
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
							</svg>
						</button>
					</div>

					<h2 className="text-lg font-semibold dark:text-white font-mono">
						Menu
					</h2>
				</div>
				{/* Menu List */}
				<div className="w-full max-h-full overflow-y-auto px-2 py-2 space-y-4">
					{menuItems.map((item, index) => (
						// <Drawer key={item.name} name={item.name} path={item.path} />
						<Link
							to={item.path}
							className="flex flex-col items-start justify-center space-x-4 w-full py-2 border-b-1 dark:border-gray-400"
						>
							{index + 1}. {item.name}
						</Link>
					))}
				</div>
			</div>

			{/* Standard Calculator */}
			<div className="w-full md:w-full h-full  md:flex flex-col items-center justify-center rounded-lg ">
				<StandardCalculator />
			</div>
			{/* History Section */}
			<div className="hidden w-[40%] h-full md:flex flex-col items-center dark:bg-black/10 p-1.5 rounded-lg shadow-lg">
				{/* Header */}
				<div className="flex flex-col items-end justify-center space-y-1 space-x-4 w-full py-4 border-b-2 dark:border-gray-700">
					<h2 className="text-lg font-semibold dark:text-white font-mono">
						History
					</h2>
					<button
						className="mr-4 inline-flex items-center justify-center bg-gray-200 border-0 py-0.5 px-2 focus:outline-none  hover:bg-red-400 rounded-lg text-base  dark:bg-gray-700 dark:text-white dark:hover:bg-red-400 dark:hover:text-white/80 cursor-pointer"
						onClick={() => {
							if (calculations.length > 0) {
								dispatch(clearCalculations());
							} else {
								toast.error("No history to clear!", {
									duration: 2000,
									position: "top-right",
								});
							}
						}}
					>
						Clear History
						{/* Delete ICon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="ml-1 size-5 w-5 h-5   "
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
							/>
						</svg>
					</button>
				</div>

				{/* History List */}
				<div className="w-full max-h-full overflow-y-auto px-2 py-2 space-y-4">
					{calculations.map((cal) => (
						<HistoryCard
							key={cal.id}
							id={cal.id}
							note={cal.note}
							expression={cal.expression}
							result={cal.result}
							handleDelete={handleDelete}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Standard;
