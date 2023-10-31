import Link from "next/link";
import { useState } from "react";
import { routes } from "./routes";

export default function Sidebar() {
  
  const [open, setOpen] = useState(false);

  return (
    <div
      className={` ${open ? "lg:w-20" : "lg:w-60 "
        } flex flex-col lg:h-screen p-3 w-full bg-[#0f3a30] shadow duration-300`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={` ${open ? 'hidden' : ''} text-xl font-bold text-white`}>Travelnik</h2>
          <h2 className={` ${open ? '' : 'hidden'} text-xl font-bold text-white`}>T</h2>
          <button onClick={() => setOpen(!open)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {routes.map((item, key) => (
              <li key={key} className="rounded-sm">
                <Link
                  href={item.route}
                  className="flex items-center p-2 space-x-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className={` ${open ? 'hidden' : ''} text-gray-100`}>{item.dashboard}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
