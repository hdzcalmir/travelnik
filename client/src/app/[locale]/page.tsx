"use client"

import Features from "@/components/home/features/Features"
import Footer from "@/components/home/footer/Footer"
import Hero from "@/components/home/hero/Hero"
import Navbar from "@/components/home/navbar/Navbar"


export default function Home() {

    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </>
    )
}
