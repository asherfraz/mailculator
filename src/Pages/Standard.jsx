import React from "react";
import Drawer from "../Components/Drawer";
import StandardCalculator from "../Components/StandardCalculator";

const Standard = () => {
	return (
		<div className=" dark:bg-gray-800 dark:text-white w-full h-[85vh] px-6 flex flex-row justify-center items-center">
			{/* Drawer */}
			<div className="hidden w-[30%] h-full  md:flex flex-col items-start bg-black/60">
				{/* Drawer Menu */}
				<div className="flex flex-row justify-between items-center w-full h-[10%] p-5 border-b-2 dark:border-gray-700">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Menu
					</h2>
				</div>
			</div>
			{/* Standard Calculator */}
			<div className="w-full md:w-full h-full  md:flex flex-col items-center justify-center rounded-lg ">
				<StandardCalculator />
			</div>
			{/* History */}
			<div className=" hidden w-[40%] h-full  md:flex flex-col items-center bg-black/60">
				History
			</div>
		</div>
	);
};

export default Standard;
