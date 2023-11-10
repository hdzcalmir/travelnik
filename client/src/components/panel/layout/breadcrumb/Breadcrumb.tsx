"use client"
import React, { ReactNode } from "react";
import { usePathname } from 'next/navigation'

type TBreadCrumbProps = {
  homeElement: ReactNode,
}

export default function Breadcrumb({ homeElement}: TBreadCrumbProps) {

  const paths = usePathname()
  const pathNames = paths.split('/').filter(segment => segment !== '');
  const crumb = pathNames
    .map(segment => capitalizeFirstLetter(segment.replace(/-/g, ' ')))
    .join(' - ');

  const crumbTitle = capitalizeFirstLetter(pathNames[1].replace(/-/g, ' '));
  

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="w-2/3 h-16">
      <h1 className="text-xl text-gray-50 font-bold">{crumbTitle}</h1>
      <p className="text-sm text-gray-400">{crumb}</p>
    </div>
  )
}
