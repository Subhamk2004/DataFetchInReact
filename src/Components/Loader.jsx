import React, { useEffect, useRef } from 'react';
import loaderIcon from '../assets/loader.svg';
import { useUserContext } from '../Context/UserContext';

function Loader() {
  const { limit, setLimit, loader, setLoader, userData } = useUserContext();
  const loaderRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && limit < 208) {
        setLoader(true);
        setLimit(prevLimit => prevLimit + 10);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [limit, setLimit, setLoader]);

  useEffect(() => {
    const handleScroll = () => {
      const reachedBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;
      if (reachedBottom && limit < 208) {
        setLoader(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [limit, setLoader]);

  return (
    <div ref={loaderRef} className='mt-3 flex justify-center'>
      {loader === true ? (
        <img src={loaderIcon} className='h-20' alt="Loading" />
      ) : null}
    </div>
  );
}

export default Loader;