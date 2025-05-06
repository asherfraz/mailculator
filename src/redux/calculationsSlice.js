import { createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const initialState = {
    calculation: localStorage.getItem('history')
        ? JSON.parse(localStorage.getItem('history'))
        : []
}

const calculationsSlice = createSlice({
    name: 'calculations',
    initialState,
    reducers: {
        addToCalculations(state, action) {
            // check if data is empty or not
            if (action.payload.expression === "" || action.payload.result === "") {
                toast.error("Please enter a valid expression and result!", {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        backgroundColor: "#f44336",
                        color: "#fff",
                    },
                });
                return;
            }

            const newCalculation = {
                id: Date.now(),
                expression: action.payload.expression,
                result: action.payload.result,
                note: action.payload.note,
            }
            state.calculation.unshift(newCalculation)
            localStorage.setItem('history', JSON.stringify(state.calculation))

            toast.success("Added to history!", {
                duration: 2000,
                position: "top-right",
                style: {
                    backgroundColor: "#4caf50",
                    color: "#fff",
                },
            });

        },
        updateFromCalculations(state, action) {

            const updatedCalculation = {
                id: action.payload.id,
                expression: action.payload.expression,
                result: action.payload.result,
                note: action.payload.note,
            }

            const index = state.calculation.findIndex(index => index.id === action.payload.id)


            if (index >= 0) {
                state.calculation[index] = updatedCalculation
                localStorage.setItem('history', JSON.stringify(state.calculation))
                toast.success("Calculation Updated!", {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        backgroundColor: "#4caf50",
                        color: "#fff",
                    },
                });
            } else {
                toast.error("Calculation Failed to Update!", {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        backgroundColor: "#4caf50",
                        color: "#fff",
                    },
                });
            }


        },

        removeFromCalculations(state, action) {
            const calculationToRemove = state.calculation.filter(
                (calculation) => calculation.id !== action.payload
            )
            state.calculation = calculationToRemove
            localStorage.setItem('history', JSON.stringify(state.calculation))

            toast.success("Removed from history!", {
                duration: 2000,
                position: "top-right",
                style: {
                    backgroundColor: "#f44336",
                    color: "#fff",
                },
            });
        },
        clearCalculations(state, action) {
            state.calculation = []
            localStorage.setItem('history', JSON.stringify(state.calculation))

            toast.success("History cleared!", {
                duration: 2000,
                position: "top-right",
                style: {
                    backgroundColor: "#4caf50",
                    color: "#fff",
                },
            });
        },
    },
})

export const { addToCalculations, updateFromCalculations, removeFromCalculations, clearCalculations } = calculationsSlice.actions
export default calculationsSlice.reducer

