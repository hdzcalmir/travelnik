"use client"

import Footer from "@/components/home/footer/Footer";
import Navbar from "@/components/home/navbar/Navbar"
import { useLocale } from "next-intl";
import Image from "next/image";
import { Parallax } from "react-parallax";

const AboutPage = () => {
    const locale = useLocale();
    return (
        <>
            <Navbar />
            <div className="bg-gray-800">
                <Parallax
                    bgImage={`/images/travnik-14-${locale}.png`}
                    className="object-cover"
                    strength={500}
                >
                    <div className="relative h-[50rem]">
                        <Image
                            src="/images/travnik-15.png"
                            width={1900}
                            height={400}
                            className="absolute w-full h-full object-cover"
                            alt="Travnik header picture"
                        />
                    </div>
                </Parallax>
            </div>
            <Footer />
        </>
    );
}

export default AboutPage;