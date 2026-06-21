import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import ChatLabel from "./ChatLabel";

const ChatHeader = ({ expand, setExpand }) => {

    const { selectedChat, createNewChat } = useAppContext()
    const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

    return (
        <div className="shrink-0 h-14 w-full border-b border-white/10 bg-[#292a2d]">
            <div className="h-full flex items-center justify-between px-4">
                <div className={`${expand ? "hidden" : "block"} flex items-center justify-center md:hidden hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer`}>
                    <Image className="rotate-180"
                        src={assets.menu_icon}
                        alt=""
                        onClick={() => (expand ? setExpand(false) : setExpand(true))} />
                </div>
                <div>
                    {selectedChat ? (
                        <div className="max-w-sm w-full">
                            <ChatLabel
                                id={selectedChat._id}
                                name={selectedChat.name}
                                openMenu={openMenu}
                                setOpenMenu={setOpenMenu}
                                textSize="text-base"
                            />
                        </div>
                    ) : (
                        <p className="text-base text-gray-400 font-medium">
                            New Chat
                        </p>
                    )}
                </div>
                <div className={`${expand ? "hidden" : "block"} flex items-center justify-center md:hidden hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer`}>
                    <Image className="opacity-70"
                        src={assets.chat_icon}
                        alt=""
                        onClick={() => createNewChat()} />
                </div>
            </div>

        </div>
    );
}

export default ChatHeader;
