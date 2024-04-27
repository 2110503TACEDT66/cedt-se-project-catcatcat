'use client'

import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react';

export default function TopMenuPreium() {

    const router = useRouter()
    const [shouldScroll, setShouldScroll] = useState(false);

    const handleViewAllPlans = () => {
        setShouldScroll(true);
    };

    useEffect(() => {
        if (shouldScroll) {
            const element = document.getElementById('membership');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setShouldScroll(false);
            }
        }
    }, [shouldScroll]);


    return (
        <div>
            <div className="relative flex items-center justify-center flex-col">
                <img src="/img/premium_1.png" alt="cute cat" className="inset-x-0 bottom-0 w-full h-full" />
                <div className="absolute right-0 bottom-0 text-center w-1/2 top-1/3 h-full">
                    <div className="text-yellow-600 text-3xl font-bold py-5">CATCATCAT Premium</div>
                    <button className="px-6 py-4 hover:bg-sky-800 text-white font-bold rounded-lg shadow-2xl bg-sky-950" onClick={handleViewAllPlans}> View all plan </button>
                </div>
            </div>
        </div>
    );
}
