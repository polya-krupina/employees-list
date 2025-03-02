import { createSlice } from '@reduxjs/toolkit';

const loadFiltersFromLocalStorage = () => {
    const filters = localStorage.getItem('filters');
    return filters ? JSON.parse(filters) : {};
};

const initialState = loadFiltersFromLocalStorage();

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action) {
            const { filterKey, selectedFilters } = action.payload;
            state[filterKey] = selectedFilters;
            localStorage.setItem('filters', JSON.stringify(state));
        },
        resetFilters(state) {
            Object.keys(state).forEach((key) => {
                state[key] = [];
            });
            localStorage.removeItem('filters');
        }
    }
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
