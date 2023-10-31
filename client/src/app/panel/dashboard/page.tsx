"use client"

import Sidebar from '../components/sidebar/sidebar'

export default function Dashboard() {
  return (
    <div className="flex-row lg:flex">
      <Sidebar></Sidebar>
      <div className="container mx-auto mt-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Ukupno lokacija
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            125
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Ukupno aktivnosti
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            1259
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Ukupno događaja
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                           35
                        </div>
                    </div>
                </div>
            </div>
      </div>
  )
}
