import React, { useEffect, useRef } from 'react'
import './SearchBar.css'

const SearchBar = ( {searchTerm, handleChange, handleSearch, city} ) => {

    // While listing the cities click other position, then removing cities list
    const wrapperRef = useRef(null);

    const handleClickOutside = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            handleChange({ target: {value: ""}});
        }
    };
    useEffect( () => {
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
                <ul onClick={handleSearch}>
                {city.map((c) => (
                    <li key={c.id} onClick={() => handleChange({ target: { value: c.name } })}>
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