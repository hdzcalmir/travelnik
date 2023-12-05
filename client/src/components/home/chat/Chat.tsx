"use client"

import useChat from "@/hooks/useChat";
import Message from "./Message";
import MessageSkeleton from "./Skeleton";
import { Dispatch, SetStateAction } from "react";

interface ChatProps {
    chatOpened: boolean;
    setChatOpened: Dispatch<SetStateAction<boolean>>;
}

const Chat = ({ chatOpened, setChatOpened }: ChatProps) => {

    const { messages, messagesLoading } = useChat();

    return (
        <div className={`${chatOpened ? "" : "hidden"} fixed bottom-[5.7rem] right-14 w-96 shadow-lg drop-shadow-lg`}>
            <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                <div className="p-4 border-b bg-secondaryColor text-white rounded-t-lg flex justify-between items-center">
                    <p className="text-lg font-semibold">Travnik Navigator</p>
                    <button className="text-white hover:text-gray-200 transition duration-500" onClick={() => setChatOpened(!chatOpened)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-4 h-80 overflow-y-auto">
                    {messagesLoading ? <MessageSkeleton /> : messages?.map((message) => <Message key={message.content} message={message} />)}
                </div>
                <div className="p-4 border-t flex">
                    <input type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondaryColor" />
                    <button className="bg-secondaryColor text-white px-4 py-2 rounded-r-md hover:bg-secondaryColor/80 transition duration-300">Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;