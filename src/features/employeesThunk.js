import { setLoading, appendEmployees, setHasMore, setPage } from './employeesSlice';

const filterOptions = {
    gender: [
        { label: 'Мужчина', value: 'Male' },
        { label: 'Женщина', value: 'Female' }
    ],
    position: [
        { label: 'Backend-разработчик', value: 'Backend' },
        { label: 'Frontend-разработчик', value: 'Frontend' },
        { label: 'Аналитик', value: 'Analyst' },
        { label: 'Менеджер', value: 'Manager' },
        { label: 'Дизайнер', value: 'Designer' }
    ],
    stack: [
        { label: 'C#', value: 'CSharp' },
        { label: 'React', value: 'React' },
        { label: 'Java', value: 'Java' },
        { label: 'PHP', value: 'PHP' },
        { label: 'Figma', value: 'Figma' },
        { label: 'Word', value: 'Word' }
    ]
};

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

    const url = `https://frontend-test-api.stk8s.66bit.ru/api/Employee?${queryParams.join('&')}`;

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
