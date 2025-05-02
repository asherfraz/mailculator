import { createBrowserRouter, Link } from "react-router";
import Layout from "./Layout";
import Standard from "./Pages/Standard";

const router = createBrowserRouter([
	{
		path: "*",
		element: (
			<Layout>
				<div className="text-4xl font-bold flex flex-col justify-center items-center h-[85vh] w-full bg-gray-100 dark:bg-gray-800 dark:text-white text-shadow-lg ">
					404 Not Found!
					<br />
					<span className="text-2xl font-mono text-gray-500 dark:text-white/70">
						Please check the URL or go back to the home page.
					</span>
					<br />
					<Link to={"/"} type="button" className="text-lg border-2 p-2 rounded">
						{">"} Standard Calculator
					</Link>
				</div>
			</Layout>
		),
	},
	{
		path: "/",
		element: (
			<Layout>
				<Standard />
			</Layout>
		),
	},
	{
		path: "/scientific",
		element: <Layout>scientific Calculator</Layout>,
	},
	{
		path: "/currency",
		element: <Layout>Currency Calculator</Layout>,
	},
]);

export default router;
