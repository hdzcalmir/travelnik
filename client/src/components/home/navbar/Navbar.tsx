"use client";

import { homeSitemap } from "./homeSitemap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Language from "./Language/Language";

const Navbar = () => {
  const path = usePathname();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  return (
    <header className="relative">
      <nav className="px-4 lg:px-6 py-8 bg-gray-800 shadow-lg ">
        <div className="w-full flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/travelnik-logo.png"
              className="mr-3 h-6 "
              alt="Travelnik logo"
              width={200}
              height={10}
            />
          </Link>
          <div className="flex items-center lg:order-2">
            <Language />
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${mobileMenu ? "absolute top-20 left-0" : "hidden"} h-screen py-2 border-b-2 shadow-lg sm:shadow-none sm:border-b-0 border-b-gray-700 bg-gray-800 z-10 w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col justify-center mx-auto mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {homeSitemap &&
                homeSitemap.map((navLink) => (
                  <li key={navLink.name}>
                    <Link
                      href={navLink.link}
                      className={`block py-2 pr-4 pl-3 ${path === navLink.link ? "text-white" : "text-gray-400"
                        } rounded lg:bg-transparent lg:p-0 text-xl text-center`}
                      aria-current="page"
                    >
                      {navLink.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>

    </header>
  );
};

export default Navbar;
