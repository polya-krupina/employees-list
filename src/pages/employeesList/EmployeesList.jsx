import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/filtersSlice';
import { fetchEmployees } from '../../features/employeesThunk';
import Filter from '../../components/filter/Filter';
import './employeesList.css'
import Search from '../../components/search/Search';
import { useEffect, useState } from 'react';
import { setEmployees, setHasMore, setPage } from '../../features/employeesSlice';
import Navigation from '../../components/navigation/Navigation';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';

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

function EmployeesList() {
    const dispatch = useDispatch();
    const { employees, page, hasMore, isLoading, searchTerm } = useSelector(state => state.employees);
    const { gender, position, stack } = useSelector(state => state.filters);
    const [openFilter, setOpenFilter] = useState(null);

    const handleOpenFilter = (filterKey) => {
        setOpenFilter(filterKey);
    };

    useEffect(() => {
        dispatch(fetchEmployees(searchTerm, { gender, position, stack }, page));
    }, []);

    const updateFilters = (key, values) => {
        dispatch(setFilters({ key, values }));
    };

    const handleSearch = (searchValue) => {
        dispatch(setEmployees([]));
        dispatch(setPage(1));
        dispatch(setHasMore(true));
        dispatch(fetchEmployees(searchValue, { gender, position, stack }, 1));
    };

    const getRussianFilterLabels = (filterKey, filterValues) => {
        return (filterValues || []).map(value => {
            const filterOption = filterOptions[filterKey]?.find(option => option.value === value);
            return filterOption ? filterOption.label : value;
        });
    };

    const russianFilters = {
        gender: getRussianFilterLabels('gender', gender),
        position: getRussianFilterLabels('position', position),
        stack: getRussianFilterLabels('stack', stack),
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight &&
                !isLoading && hasMore
            ) {
                dispatch(fetchEmployees(searchTerm, { gender, position, stack }, page));
            }
        };
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading, page, dispatch]);


    const removeFilter = (filterKey, label) => {
        console.log(filterKey, label);
        const updatedFilters = (filterKey === 'gender' ? gender : filterKey === 'position' ? position : stack)
                .filter(value    =>    label !== getRussianFilterLabels(filterKey, [value])[0]);
        console.log(updatedFilters);
        dispatch(setFilters({ filterKey, selectedFilters: updatedFilters }));
    };

    return (
        <div className='employees-page'>
                <Navigation />
            <div className="employees_head">
                <h1 className="employees_title text-title">Список сотрудников</h1>
                <div className="employees_filters">
                    <Filter
                        defaultText='Должность'
                        filterKey='position'
                        options={filterOptions.position}
                        updateFilters={updateFilters}
                        isOpen={openFilter === 'position'}
                        onOpen={handleOpenFilter}
                    />
                    <Filter
                        defaultText='Пол'
                        filterKey='gender'
                        options={filterOptions.gender}
                        updateFilters={updateFilters}
                        isOpen={openFilter === 'gender'}
                        onOpen={handleOpenFilter}
                    />
                    <Filter
                        defaultText='Стек технологий'
                        filterKey='stack'
                        options={filterOptions.stack}
                        updateFilters={updateFilters}
                        isOpen={openFilter === 'stack'}
                        onOpen={handleOpenFilter}
                    />
                </div>
            </div>
            <div className="employees_search">
                <Search appliedFilters={russianFilters} onSearch={handleSearch} removeFilter={removeFilter} />
            </div>
            <div className='employees-list_head'>
                <span className='employees-list_title'>ФИО</span>
                <span className='employees-list_title'>Должность</span>
                <span className='employees-list_title'>Телефон</span>
                <span className='employees-list_title'>Дата рождения</span>
            </div>
            <ul className='employees-list'>
                {employees.map(employee => (
                    <li key={employee.id}>
                        <Link to={`/employee/${employee.id}`} className='employees-list_item'>
                                <span className='employees-list_name'>{employee.name}</span>
                                <span className='employees-list_job'>{employee.position}</span>
                                <span className='employees-list_number'>{employee.phone}</span>
                                <span className='employees-list_birth'>{formatDate(employee.birthdate)}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeesList;
