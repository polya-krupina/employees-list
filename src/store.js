import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './features/employeesSlice';
import themeReducer from './features/themeSlice';
import filtersReducer from './features/filtersSlice';

const store = configureStore({
    reducer: {
        employees: employeesReducer,
        theme: themeReducer,
        filters: filtersReducer,
    },
});

export default store;
