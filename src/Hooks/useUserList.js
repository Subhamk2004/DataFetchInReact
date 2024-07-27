import React, { useEffect } from "react";
import { useUserContext } from "../Context/UserContext";

function useUserList() {
    let { setLimit, limit, skip, userData, setUserData, loader, setLoader, setLoaderCount } = useUserContext();

    let fetchData = async () => {
        if (limit === 10) {
            const fetchedData = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
            const data = await fetchedData.json();
            setUserData(data);
            setLoaderCount(true);
            setLoader(false);
            setLimit(limit + 10);
        }
        else if (loader) {
            const fetchedData = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
            const data = await fetchedData.json();
            setUserData(data);
            setLoaderCount(true);
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