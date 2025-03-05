import React, { useEffect, useRef, } from 'react'
import './SearchBar.css'

const SearchBar = ( {searchTerm, handleChange, city, handleCombinedSearch} ) => {

    // While listing the cities click other position, then removing cities list
    const wrapperRef = useRef(null);

    const handleClickOutside = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            handleChange({ target: {value: ""}});
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="SearchBar" ref={wrapperRef}>
            <div className='SearchBar-Wrapper'>
            <input             
            type='text'
            value={searchTerm}
            onChange={handleChange}
            placeholder="search city..."/>
            {city.length > 0 && (
            <div className="CitySuggestions">
                <ul>
                {city
                    .filter((c) => {
                    const typed = searchTerm.toLowerCase();
                    const cityName = c.name.toLowerCase();
                    if (typed === cityName) {
                        return true; 
                    } 
                    else {
                        return cityName.includes(typed);
                    }
                    })
                    .map((c) => (
                    <li
                        key={c.id}
                        onClick={() => {
                        setTimeout(() => {
                            handleCombinedSearch();
                        }, 0);
                        }}
                    >
                        {c.name}, {c.sys.country}
                    </li>
                    ))}
                </ul>
            </div>
            )}
            </div>
        </div>
    );
}
export default SearchBar