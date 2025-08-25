import React, { useState } from 'react'
import { Search, UserPlus, Edit, Trash } from "lucide-react";
import ContactModal from '../components/blocks/ContactModal';

interface Contact {
    id: number;
    name: string;
    address: string;
}

function Contract() {
    const [contacts, setContacts] = useState<Contact[]>([
        { id: 1, name: "Alice", address: "0x123..." },
        { id: 2, name: "Bob", address: "0x456..." },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const handleAdd = () => {
        setEditingContact(null); // mở modal thêm mới
        setIsModalOpen(true);
    };

    const handleEdit = (contact: Contact) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleSave = (contact: Omit<Contact, "id">) => {
        if (editingContact) {
            // update
            setContacts((prev) =>
                prev.map((c) =>
                    c.id === editingContact.id ? { ...c, ...contact } : c
                )
            );
        } else {
            // add
            setContacts((prev) => [
                ...prev,
                { id: Date.now(), ...contact },
            ]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa contact này?")) {
            setContacts((prev) => prev.filter((c) => c.id !== id));
        }
    };

    return (
        <div className='w-full'>
            <div className='flex justify-between mt-5 items-center'>
                <p className='text-[30px] font-[500]'>Contacts</p>
                <div className="flex items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Type name or address to search..."
                        className="ml-2 w-full bg-transparent outline-none text-sm placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-5 flex-wrap">
                {/* Add Account Card */}
                <div className="w-[200px] h-[250px] bg-gray-800 rounded-xl flex flex-col justify-between p-3">
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2 items-center text-gray-500">
                        <div className="w-20 h-4 bg-gray-700 rounded" />
                        <div className="w-16 h-3 bg-gray-700 rounded" />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="flex items-center mt-5 justify-center gap-1 py-2 bg-gray-900 rounded-lg text-sm text-gray-400 hover:text-white">
                        <UserPlus size={16} /> Add
                    </button>
                </div>

                {/* Contact Card */}
                {contacts.map((c) => (
                    <div
                        key={c.id}
                        className="w-[200px] h-[250px] bg-gray-800 rounded-xl flex flex-col justify-between p-3"
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <img
                                src={`https://avatars.dicebear.com/api/personas/${c.name}.svg`}
                                alt="avatar"
                                className="w-16 h-16 rounded-lg"
                            />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">{c.name}</p>
                            <p className="text-gray-400 text-sm">{c.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-5">
                            <button
                                onClick={() => handleEdit(c)}
                                className="flex items-center justify-center py-2 bg-gray-900 rounded-lg text-sm text-gray-400 hover:text-white">
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="flex items-center justify-center py-2 bg-gray-900 rounded-lg text-sm text-gray-400 hover:text-red-400">
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <ContactModal
                    contact={editingContact}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}

export default Contract;
