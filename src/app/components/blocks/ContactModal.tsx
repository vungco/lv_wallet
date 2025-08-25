import React, { useState, useEffect } from "react";
import { X, Clipboard } from "lucide-react";

interface Contact {
    name: string;
    address: string;
}

export default function ContactModal({
    contact,
    onSave,
    onClose,
}: {
    contact: Contact | null;
    onSave: (c: Contact) => void;
    onClose: () => void;
}) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setAddress(contact.address);
        } else {
            setName("");
            setAddress("");
        }
    }, [contact]);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setAddress(text);
        } catch (err) {
            console.error("Clipboard read failed", err);
        }
    };

    const handleSubmit = () => {
        if (!name || !address) return;
        onSave({ name, address });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#22262A] rounded-xl p-6 w-[770px] h-[500px] relative px-[50px]">
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                <h2 className="text-[30px] font-bold text-center mt-5 text-white mb-6">
                    {contact ? "Edit contact" : "Add new contact"}
                </h2>

                <div className="flex gap-4 mt-10">
                    {/* Avatar placeholder */}
                    <div className="w-30 h-30 w-1/3 rounded-lg bg-gray-700 flex items-center justify-center text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="w-12 h-12"
                        >
                            <path d="M8 8a3 3 0 100-6 3 3 0 000 6z" />
                            <path
                                fillRule="evenodd"
                                d="M14 14s-1-1.5-6-1.5S2 14 2 14s1-4 6-4 6 4 6 4z"
                            />
                        </svg>
                    </div>

                    {/* Form inputs */}
                    <div className="flex-1 w-2/3 space-y-4 pl-[30px]">
                        <div>
                            <label className="text-gray-400 text-sm">Name</label>
                            <input
                                type="text"
                                placeholder="Type contact's name"
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm">Address</label>
                            <div className="relative mt-1">
                                <textarea

                                    placeholder="Type contact's address"
                                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none pr-16"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={handlePaste}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-300 hover:text-white text-sm"
                                >
                                    <Clipboard size={16} />
                                    Paste
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="mt-6 w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold"
                        >
                            {contact ? "Save" : "Add"}
                        </button>
                    </div>
                </div>

                {/* Submit button */}

            </div>
        </div>
    );
}
