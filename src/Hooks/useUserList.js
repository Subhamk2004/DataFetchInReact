import React, { useEffect } from "react";
import { useState } from "react";
import { useUserContext } from "../Context/UserContext";

function useUserList() {
    let { setLimit, limit, skip, userData, setUserData, loader, setLoader, loaderCount, setLoaderCount } = useUserContext();

    let fetchData = async () => {
        if (limit === 10) {
            const fetchedData = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
            const data = await fetchedData.json();
            // setUserData(prevData => ({...prevData, users: [...prevData.users,...data] }));
            setUserData(data);
            setLoaderCount(true);
            // console.log(loaderCount);
            console.log(userData);
            setLoader(false);
            setLimit(limit + 10);
        }
        else if (loader) {
            console.log("Limit in loader hook", limit);
            const fetchedData = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
            const data = await fetchedData.json();
            // setUserData(prevData => ({...prevData, users: [...prevData.users,...data] }));

            console.log("limit changed is hook", limit);
            console.log(data);
            setUserData(data);
            setLoaderCount(true);
            console.log(loaderCount);
            setLoader(false);
            setLimit(limit + 10);

        }

    }
    useEffect(() => {
        fetchData();
    }, [loader]);
    return userData;
}

export default useUserList;