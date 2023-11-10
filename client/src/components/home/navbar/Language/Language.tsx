"use client"

import { useEffect, useRef, useState } from "react";
import { Languages } from "./languages";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";

const Language = () => {
    const [language, setLanguage] = useState<string>("English");
    const [languageDropdown, setLanguageDropDown] = useState<boolean>(false);
    const languageRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('Languages');
    const locale = useLocale();

    const currentLanguage = Languages.find(lang => lang.name === language);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
                setLanguageDropDown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSetLanguage = (language: any) => {
        setLanguage(language.name)
    }

    return (
        <div className="relative" ref={languageRef}>
            <button
                type="button"
                onClick={() => setLanguageDropDown(!languageDropdown)}
                data-dropdown-toggle="language-dropdown"
                className="hidden sm:inline-flex items-center text-gray-800 dark:text-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 lg:px-5 py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800"
            >
                {currentLanguage && (
                    <Image src={currentLanguage.icon} alt={`Flag of ${currentLanguage.name}`} width={20} height={20} className="mr-2" />
                )}                {t(currentLanguage?.name)}
                <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <div id="dropdownDelay" className={`z-10 ${languageDropdown ? "absolute " : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                    {Languages && Languages.map((language) => (
                        <Link onClick={() => handleSetLanguage(language)} href="" locale={language.locale} key={language.name} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                            <Image src={language.icon} width={20} height={20} alt={`Flag of ${language.name}`} className="mr-2" />
                            {t(language.name)}
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Language;