import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './filter.css';

function Filter({ filterKey, defaultText, options, updateFilters }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(() => {
        const saved = localStorage.getItem(filterKey);
        return saved ? JSON.parse(saved) : [];
    });

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        localStorage.setItem(filterKey, JSON.stringify(selectedFilters));
        updateFilters(filterKey, selectedFilters);
        const params = new URLSearchParams(searchParams);
        if (selectedFilters.length) {
            params.set(filterKey, selectedFilters.join(','));
        } else {
            params.delete(filterKey);
        }
        setSearchParams(params, { replace: true });
    }, [selectedFilters, filterKey, searchParams, setSearchParams]);

    const toggleFilter = (value) => {
        setSelectedFilters((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    return (
        <div className='filter'>
            <div className='filter_value' onClick={() => setIsOpen(!isOpen)}>
                <span>{defaultText}</span>
                <svg width='20' height='9' viewBox='0 0 20 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M1.67174 8.04879L8.52798 1.52879C9.33769 0.758794 10.6627 0.758794 11.4724 1.52879L18.3286 8.04879'
                        stroke='#155DA4'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </div>
            {isOpen && (
                <div className='filter_options'>
                    {options.map((option) => (
                        <label key={option.value} className='filter_option-label'>
                            {option.label}
                            <input
                                type='checkbox'
                                className='filter_option-input'
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
