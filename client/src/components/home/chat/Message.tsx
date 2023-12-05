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
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{message.content}</p>
                </div>
            )}
            {message.role === "user" && (
                <div className="mb-2 text-right">
                    <p className="bg-secondaryColor text-white rounded-lg py-2 px-4 inline-block">{message.content}</p>
                </div>
            )}
        </>
    );
}

export default Message;