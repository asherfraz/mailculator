import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("light");

	// Check for saved theme in localStorage and system preference on initial load
	useEffect(() => {
		const saved = localStorage.getItem("theme");
		const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";

		setTheme(saved || systemPref);
	}, []);

	// Update localStorage whenever the theme changes
	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
		// console.log("Theme toggled to:", theme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className={theme}>{children}</div>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
