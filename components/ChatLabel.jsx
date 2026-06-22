import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'

const ChatLabel = ({ openMenu, setOpenMenu, id, name, textSize = "text-sm" }) => {

    const { fetchUsersChats, chats, selectedChat, setSelectedChat } = useAppContext();
    const menuRef = useRef(null);

    const isSelected = selectedChat?._id === id;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!openMenu.open) return;

            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu({ id: 0, open: false, position: null });
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [openMenu]);

    const selectChat = () => {
        const chatData = chats.find(chat => chat._id === id)
        setSelectedChat(chatData)
        console.log(chatData)
    }

    const renameChat = async () => {
        try {
            const newName = prompt("Enter new name")
            if (!newName) return
            const { data } = await axios.post('/api/chat/rename', { chatId: id, name: newName })
            if (data.success) {
                fetchUsersChats()
                setOpenMenu({ id: 0, open: false })
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteChat = async () => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this chat?")
            if (!confirm) return
            const { data } = await axios.post('/api/chat/delete', { chatId: id })
            if (data.success) {
                fetchUsersChats()
                setOpenMenu({ id: 0, open: false })
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleClick = (e) => {
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();

        // CASE 1: clicking same open menu → close it
        if (openMenu.id === id && openMenu.open) {
            setOpenMenu({ id: 0, open: false, position: null });
            return;
        }

        // CASE 2: open new menu (or switch)
        setOpenMenu({
            id,
            open: true,
            position: {
                top: rect.top + 24,
                left: rect.right - 16
            }
        });
    };

    return (
        <div className={`flex items-center justify-between gap-3 p-2 text-white/80 rounded-lg ${textSize} ${isSelected ? "bg-white/10" : "hover:bg-white/10"} group cursor-pointer`}
            onClick={selectChat}>
            <p className="group-hover:max-w-5/6 truncate">
                {name}
            </p>
            <div className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg"
                onClick={handleClick}>
                <Image className={`w-4 ${openMenu.id === id && openMenu.open ? "" : "hidden"} group-hover:block`}
                    src={assets.three_dots} alt="" />

                {openMenu.id === id &&
                    openMenu.open &&
                    openMenu.position &&
                    createPortal(
                        <div className="fixed bg-gray-700 rounded-xl p-2 z-[9999]"
                            style={{
                                top: openMenu.position.top,
                                left: openMenu.position.left,
                            }}
                            ref={menuRef}
                            onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer"
                                onClick={renameChat} >
                                <Image className="w-4" src={assets.pencil_icon} alt="" />
                                <p className="text-white/80">Rename</p>
                            </div>

                            <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer"
                                onClick={deleteChat}>
                                <Image className="w-4" src={assets.delete_icon} alt="" />
                                <p className="text-red-500/80">Delete</p>
                            </div>
                        </div>,
                        document.body
                    )
                }
            </div>
        </div>
    )
}

export default ChatLabel