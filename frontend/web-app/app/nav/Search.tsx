'use client';

import { useParamsStore } from '@/hooks/useParamsStore';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
    const setParams = useParamsStore((state) => state.setParams);
    const searchTearm = useParamsStore((state) => state.searchTerm);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (searchTearm === '') setValue('');
    }, [searchTearm]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSearch = () => {
        setParams({ searchTerm: value });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex w-[50%] items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">
            <input
                type="text"
                value={value}
                placeholder="Search for cars by make, model or color"
                className="flex-grow pl-5 bg-transparent 
                focus:outline-none border-transparentfocus:border-transparent 
                focus:ring-0 text-sm text-gray-600"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch} className="flex items-center">
                <FaSearch
                    size={34}
                    className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
                />
            </button>
        </div>
    );
}
