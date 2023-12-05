"use client"

import Image from "next/image";
import { useState } from "react";
import Chat from "./Chat";

const ChatIcon = () => {

    const [chatOpened, setChatOpened] = useState<boolean>(false);

    return (
        <>
            <div className="fixed bottom-0 right-0 mb-4 mr-4">
                <button className="py-2 px-4 rounded-md flex items-center" onClick={() => setChatOpened(!chatOpened)}>
                    <Image src="/images/chat.png" alt="OpenAI chat bot for Travnik" height={40} width={60} />
                </button>
            </div>

            <Chat chatOpened={chatOpened} setChatOpened={setChatOpened} />
        </>
    );
}

export default ChatIcon;