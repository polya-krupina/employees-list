import './filter.scss';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/filtersSlice';

function Filter({ filterKey, defaultText, options, isOpen, onOpen }) {
    const dispatch = useDispatch();
    const selectedFilters = useSelector((state) => state.filters[filterKey] || []);
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                onOpen(null);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onOpen]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (selectedFilters.length) {
            params.set(filterKey, selectedFilters.join(','));
        } else {
            params.delete(filterKey);
        }
        const queryString = params.toString();
        const newUrl = queryString.length > 0 ? '?' + queryString : window.location.pathname;
        window.history.replaceState(null, '', newUrl);
    }, [selectedFilters, filterKey]);

    const toggleFilter = (value) => {
        const updatedFilters = selectedFilters.includes(value)
            ? selectedFilters.filter((v) => v !== value)
            : [...selectedFilters, value];
        dispatch(setFilters({ filterKey, selectedFilters: updatedFilters }));
    };

    const handleFilterClick = (event) => {
        event.stopPropagation();
        onOpen(isOpen ? null : filterKey);
    };

    return (
        <div className="filter" ref={filterRef}>
            <div className={`filter_value ${isOpen ? 'filter_value__active' : ''}`} onClick={handleFilterClick}>
                <span>{defaultText}</span>
                <svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.67174 8.04879L8.52798 1.52879C9.33769 0.758794 10.6627 0.758794 11.4724 1.52879L18.3286 8.04879"
                        stroke="#155DA4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="filter_options">
                    {options.map((option) => (
                        <label key={option.value} className="filter_option-label">
                            {option.label}
                            <input
                                type="checkbox"
                                className="filter_option-input"
                                checked={selectedFilters.includes(option.value)}
                                onChange={() => toggleFilter(option.value)}
                            />
                            <div className="custom-checkbox"></div>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Filter;
