import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showMenu: false,
	showHistory: false,
};

const configurationsSlice = createSlice({
	name: "configurations",
	initialState,
	reducers: {
		toggleMenu(state) {
			state.showMenu = !state.showMenu;
		},
		toggleHistory(state) {
			state.showHistory = !state.showHistory;
		},
	},
});

export const { toggleMenu, toggleHistory } = configurationsSlice.actions;
export default configurationsSlice.reducer;
