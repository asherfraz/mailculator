import { configureStore } from '@reduxjs/toolkit'
import calculationsReducer from './calculationsSlice'

export const store = configureStore({
    reducer: {
        calculations: calculationsReducer,
        // currency: currencyReducer,
        // scientific: scientificReducer,
    },
})
