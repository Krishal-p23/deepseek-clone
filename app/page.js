'use client';
import { assets } from "@/assets/assets";
import ChatHeader from "@/components/ChatHeader";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedChat } = useAppContext();
  const containerRef = useRef(null);
  const isNearBottomRef = useRef(true);

  useEffect(() => {
    if (selectedChat) {
      isNearBottomRef.current = true;
      setMessages(selectedChat.messages)
    }
  }, [selectedChat]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && isNearBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    isNearBottomRef.current = distanceFromBottom < 100;
  };

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className={`flex-1 min-w-0 flex flex-col h-screen bg-[#292a2d] text-white transition-all ${expand ? "max-md:ml-64" : ""}`}>
          <ChatHeader expand={expand} setExpand={setExpand} />

          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="flex items-center gap-3">
                <Image className="h-16" src={assets.logo_icon} alt="" />
                <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </div>
          ) : (
            <div className="flex-1 min-h-0 w-full overflow-y-auto"
              ref={containerRef} onScroll={handleScroll}>
              <div className="flex flex-col items-center w-full px-4 pt-4">
                {messages.map((msg, idx) => (
                  <Message key={idx} role={msg.role} content={msg.content} />
                ))}
                {
                  isLoading && (
                    <div className="flex gap-4 max-w-3xl w-full py-3">
                      <Image className="h-9 w-9 p-1 border border-white/15 rounded-full"
                        src={assets.logo_icon} alt="Logo" />
                      <div className="loader flex justify-center items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          )}

          <div className="shrink-0 w-full flex flex-col items-center px-4 pb-2">
            <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
            <p className="text-xs mt-1 text-gray-500">Full-Stack Project, Created by Krishal</p>
          </div>

        </div>
      </div>
    </div >
  );
}
