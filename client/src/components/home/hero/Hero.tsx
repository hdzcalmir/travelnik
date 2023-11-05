"use client";

import Link from 'next/link';
import { FaSearchLocation } from 'react-icons/fa';
import Filter from './filter/Filter';

const Hero = () => {
    return (
        <section className="bg-[url('http://localhost:3000/images/castle.png')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
            <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-white lg:py-32 xl:px-0 z-1">
                <div className="mb-6 max-w-screen-lg lg:mb-0">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-white md:text-3xl lg:text-6xl">
                        Discover <FaSearchLocation className="inline-flex text-secondaryColor" />Travnik, Bosnia and Herzegovina&apos;s Hidden Gem!</h1>
                    <p className="mb-6 font-light text-gray-300 lg:mb-8 md:text-md lg:text-lg ">Travelnik is your personalized guide to the enchanting city of Travnik, Bosnia and Herzegovina.
                        <br></br>Packed with insider tips, interactive maps, and curated recommendations, it&apos;s the perfect companion for tourists looking to uncover the rich history, stunning architecture, and vibrant culture of this hidden gem.</p>
                    <Link href="/history" className="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-secondaryColor/80 hover:bg-secondaryColor transition duration-500 focus:ring-4 focus:outline-none focus:ring-primary-900 dark:focus:ring-secondaryColor/80">
                        Learn More
                    </Link>
                </div>
                <Filter />
            </div>
        </section>
    );
}

export default Hero;