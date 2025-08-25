import React from 'react'
import NetworkTab from '../components/blocks/NetworkTab'
import { FaDatabase } from "react-icons/fa";
function Buy() {
    return (
        <div>
            <NetworkTab />
            <div className="flex items-center text-gray-500 justify-center w-full h-full flex-col">
                <FaDatabase className='mt-20' size={30} />
                <p>Currently, there are no tokens available for</p>
                <p>purchase on the selected network.</p>
            </div>
        </div>
    )
}

export default Buy