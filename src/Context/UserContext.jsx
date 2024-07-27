import React, { useState, useContext } from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

export function UserContextProvider({children}) {
    let [limit, setLimit] = useState(10);
    let [skip, setSkip] = useState(0);
    let [userData, setUserData] = useState();
    let [loader, setLoader] = useState(true);
    let [loaderCount, setLoaderCount] = useState(false);

    let value = {
        limit,
        skip,
        setLimit,
        setSkip,
        userData,
        setUserData,
        loader,
        setLoader,
        loaderCount,
        setLoaderCount
    }
    return(
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}