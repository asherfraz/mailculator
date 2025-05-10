import { RouterProvider } from "react-router";
import router from "./Routing";
import { ThemeProvider } from "./ThemeContext.jsx";
import { NavbarProvider } from "./Context/NavbarContext.jsx";

const App = () => {
	return (
		<ThemeProvider>
			<NavbarProvider>
				<RouterProvider router={router} />
			</NavbarProvider>
		</ThemeProvider>
	);
};

export default App;
