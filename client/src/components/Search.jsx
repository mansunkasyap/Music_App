import React from 'react'
import { SearchContext } from '../music-store/SearchContext.js'

const Search = () => {
    const {search, setSearch} = React.useContext(SearchContext)
    console.log(search);
    
    return (
        <div className="search-container">
            <input
                type="search"
                value={search.songName}  
                name='search-song'
                onChange={(e) => setSearch((prev) =>({...prev, songName : e.target.value}))
                }
                placeholder='Seach Your song..'
                className='rounded outline-none px-2 py'
            />
            <button className="rounded text-sm font-medium px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white mx-1">Search</button>
        </div>
    )
}

export default Search