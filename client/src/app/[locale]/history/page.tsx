"use client"

import Navbar from "@/components/home/navbar/Navbar"
import Footer from "@/components/home/footer/Footer";
import Image from "next/image";
import { Parallax } from 'react-parallax';

const HistoryPage = () => {
    return (
        <>
            <Navbar />
            <div className="bg-gray-800">
                <Parallax bgImage="/images/history-parallax-3.png" className="object-cover" strength={500}>
                    <div className="relative h-[50rem]">
                        <Image src="/images/history-parallax-2.png" width={1900} height={400} className="absolute w-full h-full object-cover" alt="Travnik header picture" />
                    </div>
                </Parallax>
                <section className="text-white bg-gray-800">
                    <div className="container px-5 pt-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h2 className="text-xs text-secondaryColor tracking-widest font-medium title-font mb-1">HISTORY OF TRAVNIK</h2>
                            <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-white">Travnik: Bosnia&apos;s City of the Viziers</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">Bosnia is well known for many things, but one of them is the striking natural beauty of the country. Still raw and unconquered by industry and urbanization, it covers the gamut in terms of ecological habitats and terrain. In central Bosnia, surrounded by rolling green hills is the “City of Viziers,” the city of Travnik.</p>
                        </div>
                    </div>
                </section>
                <section className="text-gray-600 overflow-hidden bg-gray-800">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <Image src="/images/travnik-12.png" alt="Travnik image" width={1200} height={200} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-secondaryColor tracking-widest">HISTORY OF TRAVNIK</h2>
                                <h1 className="text-white text-3xl title-font font-medium mb-1">Bosnia&apos;s Hidden Gem</h1>
                                <p className="leading-relaxed text-white text-lg">Located approximately 56 miles (90km) west of the capital Sarajevo, Travnik has been inhabited since the Bronze Age and even during the Roman occupation of the area. In the Middle Ages, Travnik was part of the župa Lašva province of the medieval Bosnian Kingdom and always held an important strategic prominence because of its proximity to major centers of trade. With the Ottoman conquests of the region, Travnik quickly rose to prominence as a shining example of commerce and political importance, as well as architecture and culture.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 pt-14 pb-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                <h2 className="text-sm title-font text-secondaryColor tracking-widest">HISTORY OF TRAVNIK</h2>
                                <h1 className="text-white text-3xl title-font font-medium mb-1">Capital of Bosnian Ottoman Province</h1>
                                <p className="leading-relaxed text-white text-lg">In 1699, after Sarajevo was burned to the ground by Prince Eugene of Savoy, Travnik became the capital of the Bosnian Ottoman province, as well as the residence of the Bosnian viziers, further cementing its importance. The Ottoman occupation of the city saw the rise of numerous architectural projects and the expansion of the city&apos;s footprint, as well as a rise in the population. It is said that Travnik produced 77 of the Ottoman Empire’s top viziers. Today, the remnants of the Medieval and Ottoman historical periods are evident in the town’s broad range of cultural and historic buildings. A fortified city, Travnik features a unique mix of Medieval, Ottoman, Mediterranean, and Austro-Hungarian architecture. Its ‘old town’ district features an eclectic mix of this wonderful architecture and is a major draw for thousands of visitors each year.</p>

                            </div>
                            <Image className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/images/travnik-11.png" alt="Travnik castle picture" width={1000} height={500} />
                        </div>
                    </div>
                </section>
            </div >
            <Footer />
        </>
    );
}

export default HistoryPage;