import './SearchBar.css'

const SearchBar = ( {searchTerm, handleChange, handleSearch, weather, city} ) => {
    return (
        <div className="SearchBar">
            <div className='SearchBar-Wrapper'>
            <input 
            type='text'
            value={searchTerm}
            onChange={handleChange}
            placeholder="search city..."/>
            <button onClick={handleSearch}>Search</button>
            {city.length > 0 && (
            <div className="CitySuggestions">
                <ul>
                {city.map((c) => (
                    <li key={c.id} onClick={() => handleChange({ target: { value: c.name } })}>
                    {c.name}, {c.sys.country}
                    </li>
                ))}
                </ul>
            </div>
            )}

                {weather && (
                <div className='WeatherInfo'>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                </div>
                )}
            </div>
        </div>
    );
}
export default SearchBar