import React from 'react'
import { Link } from 'react-router-dom'
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    return (
        <div>
            <Link to="/">
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'
                >
                    Home
                </button>
            </Link>
            <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'
                onClick={() => navigate("/register")}
            >
                register
            </button>

        </div>

    )
}

export default Login