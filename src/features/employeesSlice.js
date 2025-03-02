import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employees: [],
    page: 1,
    hasMore: true,
    isLoading: false,
    searchTerm: ''
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
        appendEmployees: (state, action) => {
            state.employees = [...state.employees, ...action.payload.employees];
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        resetEmployees: () => initialState
    }
});

export const { setEmployees, appendEmployees, setPage, setHasMore, setLoading, setSearchTerm, resetEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;
