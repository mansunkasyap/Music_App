import React, { useState } from 'react'
import { SearchContext } from './SearchContext.js'


const ContextProvider = ({ children }) => {
    const [search, setSearch] = useState({
        songName : ''
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [avatar, setAvatar] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s')

    return (
        <SearchContext.Provider value={{ search, setSearch, isLoggedIn, setIsLoggedIn, avatar, setAvatar}}>
            {children}
        </SearchContext.Provider>
    )
}

export default ContextProvider;