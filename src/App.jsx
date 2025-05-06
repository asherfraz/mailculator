import { RouterProvider } from "react-router";
import router from "./Routing";
import { ThemeProvider } from "./ThemeContext.jsx";

const App = () => {
	return (
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
