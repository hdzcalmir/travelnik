import useChat from "@/hooks/useChat";
import ChatAPI from "@/interceptor/Chat/Chat";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Button: React.FC = () => {
    const { updateChatMutation } = useChat();

    const [text, setText] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setText("");
            await updateChatMutation.mutateAsync({ message: text });
        } catch (error) {
            toast.error("Internal server error.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-4 border-t flex">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={text}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondaryColor"
                />
                <button
                    type="submit"
                    className="bg-secondaryColor text-white px-4 py-2 rounded-r-md hover:bg-secondaryColor/80 transition duration-300"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default Button;
