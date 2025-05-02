import React from "react";

const Drawer = () => {
	return (
		<div className={`block fixed inset-0 h-screen bg-black/50 z-10 `}>
			Drawer
			<div className="bg-white dark:bg-gray-800 w-64 h-full shadow-lg z-20">
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Menu
					</h2>
					<button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400">
						&times;
					</button>
				</div>
				<ul className="p-4 space-y-2">
					<li className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
						Item 1
					</li>
					<li className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
						Item 2
					</li>
					<li className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
						Item 3
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Drawer;
