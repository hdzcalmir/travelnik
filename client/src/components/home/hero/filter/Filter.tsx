"use client"

import { interests } from "./interests";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import "./DatePicker.css";
import Flatpickr from "react-flatpickr";
import { useTranslations } from "next-intl";

export interface IDepartureTime {
    check_in: string;
    check_out: string;
}
interface FilterProps {
    selectedInterests: string[];
    setSelectedInterests: Dispatch<SetStateAction<string[]>>;

    departureTime: IDepartureTime;
    setDepartureTime: Dispatch<SetStateAction<IDepartureTime>>;

    peopleComing: string;
    setPeopleComing: Dispatch<SetStateAction<string>>;
}


const Filter = ({
    selectedInterests,
    setSelectedInterests,
    departureTime,
    setDepartureTime,
    peopleComing,
    setPeopleComing }: FilterProps) => {

    const [interestDropdown, setInterestDropdown] = useState(false);
    const interestRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const t = useTranslations('Filter');

    const handleCheckedInterest = (e: ChangeEvent<HTMLInputElement>) => {
        const interest = e.target.value;

        if (e.target.checked) setSelectedInterests(prevInterests => [...prevInterests, interest]);
        else setSelectedInterests(prevInterests => prevInterests.filter(item => item !== interest));
    }

    const handlePeopleComing = (e: ChangeEvent<HTMLSelectElement>) => {
        setPeopleComing(e.target.value);
    }

    const fetchDataForGivenFilters = async () => {
        if (selectedInterests.length === 0) {
            toast.error(t('interests_error'));
            return;
        }
        if (departureTime.check_in.length === 0 || departureTime.check_out.length === 0) {
            toast.error(t('departure_error'));
            return;
        }
        if (peopleComing === 'No. people') {
            toast.error(t('people_error'));
            return;
        }
        // >> If filters are good, send request to fetch data on given filters
        router.push(`/departure?interests=${btoa(JSON.stringify(selectedInterests))}&check_in=${departureTime.check_in}&check_out=${departureTime.check_out}&people=${peopleComing}`)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (interestRef.current && !interestRef.current.contains(event.target as Node)) {
                setInterestDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className="grid gap-y-4 p-4 mt-8 w-full bg-white rounded lg:gap-x-4 lg:grid-cols-9 lg:mt-12 dark:bg-gray-800">
            <div className="lg:col-span-3">
                <label htmlFor="interest-form" className="sr-only">Interests</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <FaHashtag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div ref={interestRef}>
                        <input
                            type="text"
                            id="interest-form"
                            onClick={() => setInterestDropdown(!interestDropdown)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-secondaryColor"
                            placeholder={t('interests_placeholder')}
                            defaultValue={selectedInterests.join(', ')}
                        />
                        {interestDropdown && (
                            <div id="dropdownSearch" className="z-10 absolute bg-white top-10 shadow w-60 dark:bg-gray-700 rounded-b-lg">
                                <ul className="h-48 px-3 scrollbar-hidden pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                    {interests && interests.map((interest) => (
                                        <li key={interest}>
                                            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input
                                                    id={`checkbox-item-${interest}`}
                                                    type="checkbox"
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckedInterest(e)}
                                                    defaultValue={interest}
                                                    checked={selectedInterests.includes(interest)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                />
                                                <label htmlFor={`checkbox-item-${interest}`} className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{interest}</label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div date-rangepicker="" className="grid grid-cols-2 gap-x-4 lg:col-span-3">
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <Flatpickr
                        value={new Date(departureTime.check_in)}
                        onChange={([date]) => {
                            setDepartureTime({
                                ...departureTime,
                                check_in: date.toISOString()
                            });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-secondaryColor"
                        placeholder="DD/MM/YYYY"
                    />
                </div>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <Flatpickr
                        value={new Date(departureTime.check_out)}
                        onChange={([date]) => {
                            setDepartureTime({
                                ...departureTime,
                                check_out: date.toISOString()
                            });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-secondaryColor"
                        placeholder="DD/MM/YYYY"
                    />
                </div>
            </div>
            <div className="lg:col-span-1">
                <label htmlFor="guests" className="sr-only">Select number of people</label>
                <select id="guests" onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePeopleComing(e)} value={peopleComing} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-gray-200">
                    <option disabled>{t('people_placeholder')}</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                </select>
            </div>
            <button type="submit" onClick={fetchDataForGivenFilters} className="lg:col-span-2 justify-center md:w-auto text-white bg-secondaryColor/80 hover:bg-secondaryColor focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-500 dark:focus:ring-gray-200 inline-flex items-center">
                <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
                {t('search_button')}
            </button>
        </div>
    );
}

export default Filter;