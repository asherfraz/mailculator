import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [showHistory, setShowHistory] = useState(false);

	// Toggle functions
	const toggleMenu = () => setShowMenu((prev) => !prev);
	const toggleHistory = () => setShowHistory((prev) => !prev);

	console.log("Menu: ", showMenu);
	console.log("History: ", showHistory);

	// Close both
	const closeAll = () => {
		setShowMenu(false);
		setShowHistory(false);
	};

	// Context value
	const value = {
		showMenu,
		showHistory,
		toggleMenu,
		toggleHistory,
		closeAll,
		setShowMenu,
		setShowHistory,
	};

	return (
		<NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
	);
};

export const useNavbar = () => {
	const context = useContext(NavbarContext);
	if (!context) {
		throw new Error("useNavbar must be used within a NavbarProvider");
	}
	return context;
};

export default NavbarContext;
