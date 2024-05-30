import React, { useEffect, useRef, useState } from 'react'
import './SearchBar.css'

const SearchBar = ( {searchTerm, handleChange, city, handleCombinedSearch} ) => {

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

    // Moving List with Keyboard keys (up and down)
    // const [selectedIndex, setSelectedIndex] = useState(-1);
    // const suggestionsRef = useRef([]);

    // const handleKeyDown = (e) => {
    //     if (e.key === 'ArrowDown') {
    //         e.preventDefault();
    //       setSelectedIndex((prevIndex) => Math.min(prevIndex + 1));
    //     } else if (e.key === 'ArrowUp') {
    //         e.preventDefault();
    //       setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    //     } else if (e.key === 'Enter' && selectedIndex >= 0) {
    //       handleSelectCity(selectedIndex);
    //     }
    //   };
      
    //   const handleSelectCity = (index) => {
    //     const selectedCity = city[index];
    //     handleChange({ target: { value: selectedCity.name }});
    //     setTimeout(() => {
    //       handleCombinedSearch();
    //     }, 0);
    //   };
    //   useEffect(() => {
    //     if (selectedIndex >= 0 && selectedIndex < suggestionsRef.current.length) {
    //       suggestionsRef.current[selectedIndex].focus();
    //     }
    //   }, [selectedIndex, city]);

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
                    {city.map((c, index) => (
                        <li key={c.id} onClick={() => {
                        setTimeout(() => {
                            handleCombinedSearch();
                        }, 0);
                        }}>
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