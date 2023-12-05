"use client"

import { IChat } from "@/common/interfaces/IChat";

interface MessageProps {
    message: IChat;
}

const Message = ({ message }: MessageProps) => {
    return (
        <>
            {message.role === "assistant" && (
                <div className="mb-2">
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">Hello, I am your virtual assistant for Travnik. If you have any question please let me know.</p>
                </div>
            )}
            {message.role === "user" && (
                <div className="mb-2 text-right">
                    <p className="bg-secondaryColor text-white rounded-lg py-2 px-4 inline-block">hello</p>
                </div>
            )}
        </>
    );
}

export default Message;