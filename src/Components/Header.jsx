import React from 'react'
import logo from "../assets/logo.png"
import navbars from "../assets/navbars.png"

function Header() {
    return (
        <div className='w-full flex flex-row border'>
            <div className='w-1/2'>
                <img src={logo} className='p-2' />
            </div>
            <div className='w-1/2 flex justify-end items-center'>
                <img src={navbars} className='p-2 h-1/2' />
            </div>
        </div>
    )
}

export default Header