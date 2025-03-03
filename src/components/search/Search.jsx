import { useState } from 'react';
import './search.scss'
import Filter from '../filter/Filter';
import { setFilters } from '../../features/filtersSlice';
import { useDispatch } from 'react-redux';

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

function Search({ appliedFilters, onSearch, removeFilter }) {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [openFilter, setOpenFilter] = useState(null);

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleRemoveFilter = (filterKey, label) => {
        removeFilter(filterKey, label);
    };
    
    const handleOpenFilter = (filterKey) => {
        setOpenFilter(filterKey);
    };
    
    const updateFilters = (key, values) => {
        dispatch(setFilters({ key, values }));
    };

    return (
        <div className='search'>
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
            <input
                className='search_input'
                type="text"
                placeholder='Поиск'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className='search_options'>
                <p className='chosen-filters_title'>Выбранные фильтры:</p>
                <ul className='chosen-filters_list'>
                    {Object.entries(appliedFilters).map(([key, labels]) => {
                        if (labels) {
                            return labels.map(label => (
                            <li key={`${key}-${label}`} className='chosen-filters_item' onClick={() => handleRemoveFilter(key, label)}>
                                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.67824 5.49992L9.85953 1.3187C10.0468 1.1314 10.0468 0.827767 9.85953 0.640471C9.67223 0.453176 9.36859 0.453176 9.18129 0.640471L5 4.82169L0.818711 0.641111C0.631412 0.453815 0.327772 0.453815 0.140474 0.641111C-0.0468245 0.828406 -0.0468245 1.13204 0.140474 1.31934L4.32176 5.50056L0.141113 9.68114C-0.0461853 9.86844 -0.0461853 10.1721 0.141113 10.3594C0.235082 10.4527 0.357177 10.5 0.479912 10.5C0.602646 10.5 0.725381 10.4533 0.818711 10.3594L5 6.17815L9.18129 10.3594C9.27526 10.4527 9.39735 10.5 9.52009 10.5C9.64282 10.5 9.76556 10.4533 9.85889 10.3594C10.0462 10.1721 10.0462 9.86844 9.85889 9.68114L5.67824 5.49992Z"/>
                                </svg>
                                <p>{label}</p>
                            </li>
                            ));
                        }
                        return null;
                    })}
                </ul>
                <button className='search_button' type='button' onClick={handleSearch}>Найти</button>
            </div>
        </div>
    );
}

export default Search;
