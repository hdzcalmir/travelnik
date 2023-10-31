"use client"

import Sidebar from '../components/sidebar/sidebar'

export default function Dashboard() {
  return (
    <div className="flex-row lg:flex">
      <Sidebar></Sidebar>
      <div className="container mx-auto mt-4 lg:mt-12">
        <div className="p-4 mx-2 shadow-sm">
          <p>Add Dashboard Analytics </p>
        </div>
      </div>
      </div>
  )
}
