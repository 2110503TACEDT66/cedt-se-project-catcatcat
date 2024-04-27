'use client'

import { Session } from "next-auth";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function PopUp({session} : {session:Session|null}){
    
    if (!session || session.user.role != "premium" || !session.user.expire) return null;

    const currentDate = new Date();
    const expireDate = new Date(session.user.expire);

    const timeDifference = expireDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;

    if (daysRemaining > 2) return null;

    const [ openPopUp, setOpenPopUp ] = useState(true);

    const router = useRouter()

    return (   
        openPopUp ?
        <div>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-20"/>
            <div className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white p-10 rounded-xl shadow-md z-30">
                <div className="text-2xl font-bold mt-2 mb-12 text-center ">
                    Your Subscription is about to end in {daysRemaining} days {hoursRemaining} hours. 
                </div>
                <div className="flex justify-center mb-2">
                    <button className="w-52 mx-7 px-4 py-2 bg-yellow-500 text-lg font-medium rounded-xl hover:bg-yellow-600 focus:outline-none" onClick={() => { router.push('/premium')}}>
                        Renew
                    </button>
                    <button className="w-52 mx-7 px-4 py-2 bg-gray-300 text-lg font-medium rounded-xl hover:bg-gray-400 focus:outline-none"
                    onClick={()=>setOpenPopUp(false)}>
                        Nevermind
                    </button>
                </div>
            </div>
        </div>
        : null
    )
}