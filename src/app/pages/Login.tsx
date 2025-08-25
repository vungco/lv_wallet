import React from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = () => {
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        navigate('/');
    };
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='h-[150px] w-[150px] rounded-full text-white text-[24px] flex items-center justify-center mt-10 bg-gradient-to-r from-green-200 to-green-600'>
                P1
            </div>
            <p className='text-[24px] font-[500] text-white'>Profile 1</p>
            <div className="relative mt-10">
                <label className="block text-gray-400 mb-2">Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[300px] bg-[#1e2022] text-white rounded-xl px-4 py-3 border border-transparent focus:border-green-500 focus:outline-none transition-all"
                    placeholder="Enter your password"
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[60%] mt-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
            <div className="mt-5">
                <button
                    onClick={handleLogin}
                    className={`w-[250px] py-4 rounded-xl font-bold transition-all 
                            bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white
                            }`}
                >
                    Unlock
                </button>
            </div>
            <p className='underline text-white mt-5 cursor-pointer'>Forgot the password ?</p>
            <p className='underline text-white mt-1 cursor-pointer'>Want to sign in to another profile ?</p>
        </div>

    )
}

export default Login