import React from 'react'
import { Link } from 'react-router-dom'

function Home({ openFullTab }: { openFullTab?: () => void }) {
    return (
        <div>Home
            <button
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'
                onClick={openFullTab}>
                full
            </button>
            <Link to="/login">
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'
                >
                    login
                </button>
            </Link>

        </div>
    )
}

export default Home