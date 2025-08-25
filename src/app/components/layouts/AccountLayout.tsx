import React, { useContext } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SeedContext } from '../../contexts/SeedContext';
import { BiArrowBack } from 'react-icons/bi';
import { SeedProvider } from '../../contexts/SeedContext';

function AccountLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { resetSecret } = useContext(SeedContext); // hàm reset

    const handleBack = () => {
        // nếu trang trước là /register, reset phrase
        if (location.pathname === "/register") {
            resetSecret();
        }
        navigate(-1);
    };

    return (
        <SeedProvider>
            <div className="w-full h-screen bg-[#131719] flex items-center justify-center px-[120px] py-[60px]">
                <div className="bg-[#161B1E] rounded-3xl  shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] p-10 w-full h-full relative">
                    <div className="absolute top-[-70px] left-[42%]">
                        <img src="/logo.png" alt="Wigwam Logo"
                            className="w-[200px] h-[150px]"
                        />
                    </div>
                    <div className='flex justify-between items-center text-[20px] '>
                        <p className='text-white cursor-pointer hover:text-gray-300 font-[500] flex items-center'
                            onClick={handleBack}
                        ><BiArrowBack size={24} /> Back</p>
                        <p className='text-white cursor-pointer hover:text-gray-300 font-[500]'>Cancel</p>
                    </div>
                    <Outlet />
                </div>
            </div>
        </SeedProvider>
    )
}

export default AccountLayout;
