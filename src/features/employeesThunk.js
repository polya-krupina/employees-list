import { API_URL, filterOptions } from '../constants';
import { setLoading, appendEmployees, setHasMore, setPage } from './employeesSlice';

export const fetchEmployees = (searchTerm, filters, page) => async (dispatch, getState) => {
    const { hasMore, isLoading } = getState().employees;
    if ((!hasMore && page > 1) || isLoading) return;
    dispatch(setLoading(true));
    const queryParams = [`Page=${page}`];
    
    Object.keys(filters).forEach((key) => {
        if (filters[key]) {
            filters[key].forEach((value) => {
                const option = filterOptions[key].find((opt) => opt.value === value);
                if (option) {
                    queryParams.push(`${key}=${encodeURIComponent(option.value)}`);
                }
            });
        }
    });

    if (searchTerm) {
        queryParams.push(`Name=${encodeURIComponent(searchTerm)}`);
    }

    const url = `${API_URL}/Employee?${queryParams.join('&')}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            dispatch(appendEmployees({ employees: data }));
            if (data.length < 10) dispatch(setHasMore(false));
            dispatch(setPage(page + 1));
        } else {
            console.error('Ошибка при загрузке данных сотрудников');
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    } finally {
        dispatch(setLoading(false));
    }
};
