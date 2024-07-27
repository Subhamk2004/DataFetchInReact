import React from 'react'
import loaderIcon from '../assets/loader.svg'
import { useUserContext } from '../Context/UserContext';

function Loader() {

    let {limit, loader, setLoader} = useUserContext();

    window.addEventListener('scroll', () => {
        const reachedBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;

        if (reachedBottom && limit < 208) {
            setLoader(true);
            return 0;
        }
    });
    return (
        <div className='mt-3 flex justify-center'>
            {loader === true ? 
            <img src={loaderIcon} className='h-20'/>
             : null}
        </div>
    )
}

export default Loader