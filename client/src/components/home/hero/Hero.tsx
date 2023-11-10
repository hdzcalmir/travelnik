"use client";

import Link from 'next/link';
import { FaSearchLocation } from 'react-icons/fa';
import Filter, { IDepartureTime } from './filter/Filter';
import { useState } from 'react';
import { useTranslations } from 'next-intl';


const Hero = () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [peopleComing, setPeopleComing] = useState<string>('No. people');
    const [departureTime, setDepartureTime] = useState<IDepartureTime>({
        check_in: '', check_out: ''
    });
    const t = useTranslations('Hero');
    return (
        <section className="bg-[url('http://localhost:3000/images/castle.png')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
            <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-white lg:py-32 xl:px-0 z-1">
                <div className="mb-6 max-w-screen-lg lg:mb-0">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-white md:text-3xl lg:text-6xl">
                        {t('discover')} <FaSearchLocation className="inline-flex text-secondaryColor" />{t('text_1')}</h1>
                    <p className="mb-6 font-light text-gray-300 lg:mb-8 md:text-md lg:text-lg ">{t('text_2')}
                        <br></br>{t('text_3')}</p>
                    <Link href="/history" className="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-secondaryColor/80 hover:bg-secondaryColor transition duration-500 focus:ring-4 focus:outline-none focus:ring-primary-900 dark:focus:ring-secondaryColor/80">
                        {t('learn_more')}
                    </Link>
                </div>
                <Filter
                    selectedInterests={selectedInterests}
                    setSelectedInterests={setSelectedInterests}
                    departureTime={departureTime}
                    setDepartureTime={setDepartureTime}
                    peopleComing={peopleComing}
                    setPeopleComing={setPeopleComing}
                />
            </div>
        </section>
    );
}

export default Hero;