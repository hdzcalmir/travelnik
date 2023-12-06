"use client"

import useChat from "@/hooks/useChat";
import Message from "./Message";
import MessageSkeleton from "./Skeleton";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "./Button";
import { TiMessageTyping } from "react-icons/ti";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

interface ChatProps {
    chatOpened: boolean;
    setChatOpened: Dispatch<SetStateAction<boolean>>;
}

const Chat = ({ chatOpened, setChatOpened }: ChatProps) => {

    let { messages, messagesLoading } = useChat();
    const [waitingReponse, setWaitingResponse] = useState<boolean>(false);

    return (
        <div className={`${chatOpened ? "" : "hidden"} fixed bottom-[5.7rem] right-14 w-96 shadow-lg drop-shadow-lg`}>
            <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                <div className="p-4 border-b bg-secondaryColor text-white rounded-t-lg flex justify-between items-center">
                    <div>
                        <div className="flex items-center">
                            <FaMagnifyingGlassLocation className="w-7 h-7 mr-1" />
                            <p className="text-lg font-semibold">Travnik Navigator</p>
                        </div>
                        {waitingReponse && (
                            <p className="ml-8 text-xs flex items-center animate-pulse">Thinking...</p>
                        )}
                    </div>
                    <button className="text-white hover:text-gray-200 transition duration-500" onClick={() => setChatOpened(!chatOpened)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-4 h-80 overflow-y-auto">
                    {messagesLoading ?
                        <MessageSkeleton /> :
                        messages?.map((message) => <Message key={message.content} message={message} />)
                    }
                    {waitingReponse && (
                        <div className="mb-2">
                            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block animate-pulse text-2xl">...</p>
                        </div>
                    )}
                </div>
                <Button setWaitingResponse={setWaitingResponse} messages={messages} />
            </div>
        </div>
    );
}

export default Chat;