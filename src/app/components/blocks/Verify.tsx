import React, { useContext, useState } from 'react';
import { SeedContext } from '../../contexts/SeedContext';
import { useNavigate } from 'react-router-dom';
import { BiReset } from 'react-icons/bi';
import { toast, Toaster } from 'react-hot-toast';

function Verify() {
    const { secret } = useContext(SeedContext);
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string[]>([]);
    const handleWordClick = (word: string) => {
        if (!selected.includes(word)) {
            setSelected([...selected, word]);
        }
    };
    const handleSubmit = () => {
        const indicesToCheck = [0, 2, 7, 11];
        const correctWords = indicesToCheck.map(i => secret[i]);

        if (selected.length !== correctWords.length) {
            toast.error("Please select all 4 words");
            return;
        }

        const isCorrect = correctWords.every((word, idx) => word === selected[idx]);

        if (isCorrect) {
            toast.success("Verified successfully!");
            navigate("/setuppassword");
        } else {
            toast.error("Incorrect sequence, try again!");
            setSelected([]);
        }
    };
    const handleSkip = () => {
        alert("Skipped verification");
        // tiếp tục flow
    };
    const reset = () => {
        setSelected([]); // reset selected words
    };

    return (
        <div className="p-8 w-full max-w-md mx-auto bg-[#161B1E] rounded-xl text-white">
            <Toaster position="top-right" />
            <h2 className="text-center text-2xl font-bold mb-4">Verify Secret Phrase</h2>
            <p className="text-center mb-6 text-sm">
                Select the 1st, 3rd, 8th, and 12th words in order your Secret phrase displays them
            </p>
            <p className='hover:text-gray-500 text-gray-200 text-[14px] cursor-pointer flex items-center justify-end mb-2'
                onClick={reset}><BiReset /> reset</p>
            <div className="grid grid-cols-3 gap-2 mb-6 text-white">
                {secret.map((word, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleWordClick(word)}
                        className={`p-2 rounded bg-gray-800 hover:bg-green-600 transition ${selected.includes(word) ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={selected.includes(word)}
                    >
                        {word}
                    </button>
                ))}
            </div>
            <div className="mb-6">
                <p>Selected words:</p>
                <div className="p-2 bg-gray-900 rounded min-h-[50px]">
                    {selected.join(" ")}
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full py-2 bg-[#80EF6E] rounded hover:shadow-[0_0_20px_rgba(144,238,144,0.7)]"
            >
                Verify
            </button>
            {/* <div className="flex justify-between mb-4">
                <button onClick={handleSkip} className="hover:text-gray-300">Skip this</button>
            </div> */}
        </div>
    );
}

export default Verify;
