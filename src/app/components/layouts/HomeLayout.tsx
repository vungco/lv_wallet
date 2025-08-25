import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from "react-router-dom";
import Sidebar from '../blocks/Sidebar';
import Header from '../blocks/Header';
import { NetworkProvider } from '../../contexts/NetworkContext';
import { saveToStorage, getFromStorage } from '../../hooks/useChromeStorage';
function HomeLayout() {

    return (
        <NetworkProvider>
            <div className="bg-[#131719] sm:px-10 p-0 text-[16px] flex w-full min-h-screen text-white">
                <div className='w-1/5 h-full hidden sm:block'>
                    <Sidebar />
                </div>
                <div className="sm:pl-5 p-0 sm:w-4/5 w-full ">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </NetworkProvider>
    )
}

export default HomeLayout