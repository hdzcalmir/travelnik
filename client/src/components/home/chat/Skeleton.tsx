"use client"
const MessageSkeleton = () => {
    return (
        <>
            <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block animate-pulse w-60"></p>
            </div>
            <div className="mb-2 text-right">
                <p className="bg-secondaryColor text-white rounded-lg py-2 px-4 inline-block w-60"></p>
            </div>
        </>
    );
}

export default MessageSkeleton;