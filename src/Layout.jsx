import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<main className="bg-gray-100 dark:bg-gray-800  dark:text-white min:h-full max:h-screen  flex flex-col justify-center items-center">
				{children}
			</main>
			<Footer />

			<Toaster />
		</div>
	);
};

export default Layout;
