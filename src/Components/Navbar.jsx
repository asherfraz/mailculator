import { useNavbar } from "../Context/NavbarContext";
import { useTheme } from "../ThemeContext";
import { Link } from "react-router";

const Navbar = () => {
	const { theme, toggleTheme } = useTheme();
	const { showMenu, showHistory, toggleMenu, toggleHistory } = useNavbar();

	return (
		<header className="text-gray-600  font-serif dark:bg-gray-800 dark:text-white  ">
			<div className="container mx-auto flex flex-wrap p-5 flex-row  items-center justify-between border-b-2 border-gray-200">
				{/* Hamburger/Menu Icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="size-6 md:hidden dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white/80"
					onClick={() => {
						toggleMenu();
					}}
				>
					<path
						fillRule="evenodd"
						d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
						clipRule="evenodd"
					/>
				</svg>

				<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
					{/* <a href className="mr-5 hover:text-gray-900">
						First Link
					</a>*/}
					<Link
						to="/"
						className="flex title-font font-medium items-center text-gray-900 dark:text-white"
					>
						<span className="ml-3 text-2xl border-y-4 rounded-lg border-amber-300">
							&nbsp; MailCulator &nbsp;
						</span>
					</Link>
				</nav>
				<div className="flex items-center justify-center">
					<button
						className="md:hidden inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white/80"
						onClick={() => {
							toggleHistory();
						}}
					>
						History
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="ml-1 size-4"
						>
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
