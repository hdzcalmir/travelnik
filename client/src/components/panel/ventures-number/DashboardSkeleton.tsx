"use client"

const DashboardSkeleton = () => {
    return (
        <div className="bg-white">
            <div className="px-6 mx-auto animate-pulse">
                <div className="grid grid-cols-1 gap-8 xl:gap-12 sm:grid-cols-3 lg:grid-cols-3 mb-4">
                    <div className="w-full">
                        <div className="w-full h-36 bg-gray-300 rounded-lg "></div>
                    </div>
                    <div className="w-full ">
                        <div className="w-full h-36 bg-gray-300 rounded-lg "></div>
                    </div>
                    <div className="w-full ">
                        <div className="w-full h-36 bg-gray-300 rounded-lg "></div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full">
                        <div className="w-full h-96 bg-gray-300 rounded-lg "></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardSkeleton;