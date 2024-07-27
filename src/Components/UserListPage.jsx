import React, { useCallback, useEffect, useState } from 'react'
import useUserList from '../Hooks/useUserList';
import { useUserContext } from '../Context/UserContext';
import filter from '../assets/filter.png';
import sort from '../assets/sort.png';

function UserListPage() {
    let [newLimit, setNewLimit] = useState();
    let [newSkip, setNewSkip] = useState();
    let [currentState, setCurrentState] = useState("Country");
    let [currentGender, setCurrentGender] = useState("Gender");
    let stateData = [];
    let [sortedCities, setSortedCities] = useState([]);
    let [fullData, setFullData] = useState([]);
    let objData = useUserList();
    let { userData, limit, setSkip, setLimit, setUserData, loader, setLoader, loaderCount } = useUserContext();
    console.log(limit);
    console.log(loaderCount);
    if (limit > 200) {
        setLimit(208)
    }
    useEffect(() => {
        // console.log("limit changed in page", limit);
        if (!loaderCount) {
            console.log("Loading data...");
        }
        else if (!objData) {
            console.log("No data currently available");
        }
        else if (objData && !userData) {
            setUserData(objData);
        }
        else if (userData) {
            getCity();
            getFullData();
        }

    }, [userData, loaderCount])
    useEffect(() => {
        if (!userData) {
            console.log('Fetching user data');
        }
        else {
            filterByStateGender();
        }
    }, [currentState, currentGender]);

    let getCity = () => {
        for (let i = 0; i < userData.users.length; i++) {
            let state = userData.users[i].address.state;
            stateData.push(state);
        }
        stateData.sort();
        let filteredCities = [];
        for (let i = 0; i < stateData.length; i++) {
            if (stateData[i] !== stateData[i + 1]) {
                filteredCities.push(stateData[i]);
            }
        }
        setSortedCities(filteredCities);
    }
    let getFullData = () => {
        let tempData = [];
        for (let i = 0; i < userData.users.length; i++) {
            let data = userData.users[i];
            tempData.push(data);
        }
        setFullData(tempData);
    }
    let sortByName = () => {
        let tempData = [...fullData];
        tempData.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setFullData(tempData);
    }
    let sortById = () => {
        let tempData = [...fullData];
        tempData.sort((a, b) => a.id - b.id);
        setFullData(tempData);
    }
    let sortByAge = () => {
        let tempData = [...fullData];
        tempData.sort((a, b) => a.age - b.age);
        setFullData(tempData);
    }
    let filterByStateGender = () => {
        let tempData = [];
        for (let i = 0; i < userData.users.length; i++) {
            let data = userData.users[i];
            console.log(data);
            if (data.address.state === currentState && data.gender === currentGender) {
                tempData.push(data);
                console.log(1);
            }
            else if (data.address.state === currentState && currentGender === "Gender") {
                tempData.push(data);
                console.log(2);
            }
            else if (data.gender === currentGender && currentState === 'Country') {
                tempData.push(data);
                console.log(3);
            }
            else if (currentState === 'Country' && currentGender === "Gender") {
                tempData.push(data);
                console.log(4);
            }
        }
        // console.log(userData.users);
        setFullData(tempData);
    }

    let changeLimit = () => {
        setLimit(newLimit);
    }
    let changeSkip = () => {
        setSkip(newSkip);
    }
    // let arrData = Object.keys(objData);

    // console.log(arrData);




    return (
        <div className='flex flex-col w-full  h-auto'>
            <div className='flex flex-row'>
                <div className='w-1/2 flex flex-row justify-start items-center'>
                    <h2 className="text-md sm:text-3xl font-semibold ml-3">
                        Employees
                    </h2>
                </div>
                <div className='w-1/2 flex flex-row justify-end items-center gap-1 sm:gap-4'>
                    <img src={filter} className='h-1/5 sm:h-1/4' />
                    <select className='text-sm pt-1 pb-1 sm:p-2 text-center rounded-lg border-gray-400 border'
                        onChange={(e) => setCurrentState(e.target.value)}
                    >
                        <option>Country</option>
                        {sortedCities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    <select className='text-sm p-1 sm:p-2 text-center rounded-lg border-gray-400 border mr-3' onChange={(e) => setCurrentGender(e.target.value)}
                    >
                        <option>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div className='border m-1 rounded-lg'>
                <div className='text-sm sm:text-base flex flex-row w-full mt-2 mb-2'>
                    <button onClick={sortById}
                        className='w-16 flex flex-row items-center justify-center'
                    >
                        Id
                        <img src={sort} className='h-1/4' />
                    </button>
                    <button className='w-24 flex pl-2 items-center'>Image</button>
                    <button onClick={sortByName}
                        className='sm:w-56 flex items-center'
                    >
                        FullName
                        <img src={sort} className='h-1/4' />
                    </button>
                    <button className='w-28 sm:w-32 flex items-center' onClick={sortByAge}>
                        Demography
                        <img src={sort} className='h-1/4' />
                    </button>
                    <button className='hidden sm:flex sm:w-40 items-center'>Designation</button>
                    <button className='hidden sm:flex sm:w-36 ml-4 items-center'>Location</button>
                </div>
                <div>
                    {fullData.map((data, dataIndex) => (
                        <div key={data.id} className='text-black flex flex-row items-center border w-full'>
                            <div className='w-16 flex justify-center text-sm'>
                                {data.id}
                            </div>
                            <img src={data.image} className=' h-11 sm:h-14 pr-10' />
                            <div className='w-56 text-sm'>
                                {data.firstName}
                                {" "}
                                {data.maidenName}
                                {" "}
                                {data.lastName}
                            </div>
                            <div className=' w-32 text-sm'>
                                {data.gender === 'male' ? 'M' : 'F'}
                                {"/"}
                                {data.age}
                            </div>
                            <div className='hidden sm:visible sm:w-40'>
                                {data.company.title}
                            </div>
                            <div className='hidden sm:visible sm:w-40 ml-4'>
                                {data.address.state}
                                , USA
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserListPage;