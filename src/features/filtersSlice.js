import { createSlice } from '@reduxjs/toolkit';

const loadFiltersFromLocalStorage = () => {
    const filters = localStorage.getItem('filters');
    return filters ? JSON.parse(filters) : {};
};

const loadFiltersFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const filters = {};

    params.forEach((value, key) => {
        filters[key] = value.split(',');
    });

    return filters;
};

const mergeFilters = () => {
    const localFilters = loadFiltersFromLocalStorage();
    const urlFilters = loadFiltersFromUrl();

    if (Object.keys(urlFilters).length) {
        localStorage.setItem('filters', JSON.stringify(urlFilters));
        return urlFilters;
    }

    return localFilters;
};

const initialState = mergeFilters();

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action) {
            const { filterKey, selectedFilters } = action.payload;
            state[filterKey] = selectedFilters;

            localStorage.setItem('filters', JSON.stringify(state));

            const params = new URLSearchParams(window.location.search);
            if (selectedFilters.length) {
                params.set(filterKey, selectedFilters.join(','));
            } else {
                params.delete(filterKey);
            }

            const queryString = params.toString();
            const newUrl = queryString ? `?${queryString}` : window.location.pathname;
            window.history.replaceState(null, '', newUrl);
        },
        resetFilters(state) {
            Object.keys(state).forEach((key) => {
                state[key] = [];
            });

            localStorage.removeItem('filters');
            window.history.replaceState(null, '', window.location.pathname);
        }
    }
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
