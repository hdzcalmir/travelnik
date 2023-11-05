"use client"

import Image from "next/image";

const Features = () => {
    return (
        <section className="bg-white dark:bg-gray-800">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"><span className="underlined underline-clip">Explore</span> rich history of Travnik</h2>
                    <p className="mb-4">
                        Travnik, nestled 90 kilometers northeast of Sarajevo, is a town steeped in charm and rich history. Its unassuming exterior belies its significant historical importance as the former seat of Bosnia&apos;s Ottoman viziers. Travnik offers visitors a glimpse into a bygone era, where echoes of its illustrious past still resonate through its cobbled streets and architectural treasures.</p>
                    <p>Famous for its stunning fortress, vibrant bazaar, and the birthplace of Nobel laureate Ivo Andrić, Travnik is a place where the past comes alive. This city is a testament to the rich tapestry of Bosnia&apos;s heritage and a testament to its enduring spirit.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <Image className="w-full rounded-lg h-[30rem] object-cover" src="/images/travnik-1.png" alt="Travnik" width={1000} height={800} />
                    <Image className="mt-4 w-full lg:mt-10 rounded-lg h-[30rem] object-cover" src="/images/travnik-2.png" alt="Travnik" width={1000} height={800} />
                </div>
            </div>
        </section >
    );
}

export default Features;