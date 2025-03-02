import Filter from '../../components/filter/Filter';
import './employeesList.css'
import Search from '../../components/search/Search';
import { useEffect, useState } from 'react';

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
    const [appliedFilters, setAppliedFilters] = useState({});
    const [employees, setEmployees] = useState([]);
    const [filtersLoaded, setFiltersLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const allFilters = {};
        Object.keys(filterOptions).forEach((key) => {
            const savedFilters = JSON.parse(localStorage.getItem(key)) || [];
            const labels = savedFilters.map(value => {
                const option = filterOptions[key].find(opt => opt.value === value);
                return option ? option.label : value;
            });
            if (labels.length) {
                allFilters[key] = labels;
            }
        });
        setAppliedFilters(allFilters);
        setFiltersLoaded(true);
    }, []);

    useEffect(() => {
        if (filtersLoaded) {
            fetchEmployees(searchTerm, 1);
        }
    }, [filtersLoaded]);

    const fetchEmployees = async (search = searchTerm, newPage = page) => {
        if ((!hasMore && newPage > 1) || isLoading) return;
        setIsLoading(true);
    
        const queryParams = [`Page=${newPage}`];
    
        Object.keys(appliedFilters).forEach((key) => {
            if (appliedFilters[key]) {
                appliedFilters[key].forEach(label => {
                    const option = filterOptions[key].find(opt => opt.label === label);
                    if (option) {
                        queryParams.push(`${key}=${encodeURIComponent(option.value)}`);
                    }
                });
            }
        });
    
        if (search) {
            queryParams.push(`Name=${encodeURIComponent(search)}`);
        }
    
        const url = `https://frontend-test-api.stk8s.66bit.ru/api/Employee?${queryParams.join('&')}`;
    
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data.length < 10) setHasMore(false);
                setEmployees(prev => [...prev, ...data]);
                setPage(newPage + 1);
            } else {
                console.error('Ошибка при загрузке данных сотрудников');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight &&
                !isLoading && hasMore) {
                fetchEmployees();
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading]);
  
    const updateFilters = (key, values) => {
        const labels = values.map(value => {
            const option = filterOptions[key].find(opt => opt.value === value);
            return option ? option.label : value;
        });
        setAppliedFilters(prev => ({
            ...prev,
            [key]: labels.length ? labels : undefined
        }));
    };

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
        setEmployees([]);
        setPage(1);
        setHasMore(true);
        fetchEmployees(searchValue, 1);
    };

    function formatDate(dateString) {
        const months = {
            января: '01',
            февраля: '02',
            марта: '03',
            апреля: '04',
            мая: '05',
            июня: '06',
            июля: '07',
            августа: '08',
            сентября: '09',
            октября: '10',
            ноября: '11',
            декабря: '12'
        };
    
        const [day, monthName, year] = dateString.split(' ');
        const month = months[monthName.toLowerCase()];
        return `${day}.${month}.${year}`;
    }
    
    return (
        <div className='employees-page'>
            <div className="employees_head">
                <h1 className="employees_title text-title">Список сотрудников</h1>
                <div className="employees_filters">
                    <Filter 
                        defaultText='Должность' 
                        filterKey='position' 
                        options={filterOptions.position} 
                        updateFilters={updateFilters} 
                    />
                    <Filter 
                        defaultText='Пол' 
                        filterKey='gender' 
                        options={filterOptions.gender} 
                        updateFilters={updateFilters} 
                    />
                    <Filter 
                        defaultText='Стек технологий' 
                        filterKey='stack' 
                        options={filterOptions.stack} 
                        updateFilters={updateFilters} 
                    />
                </div>
            </div>
            <div className="employees_search">
                <Search appliedFilters={appliedFilters} onSearch={handleSearch} />
            </div>
            <div className='employees-list_head'>
                <span className='employees-list_title'>ФИО</span>
                <span className='employees-list_title'>Должность</span>
                <span className='employees-list_title'>Телефон</span>
                <span className='employees-list_title'>Дата рождения</span>
            </div>
            <div className='employees-list'>
                {employees.map(employee => (
                    <div key={employee.id} className='employees-list_item'>
                        <span className='employees-list_name'>{employee.name}</span>
                        <span className='employees-list_job'>{employee.position}</span>
                        <span className='employees-list_number'>{employee.phone}</span>
                        <span className='employees-list_birth'>{formatDate(employee.birthdate)}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default EmployeesList;
