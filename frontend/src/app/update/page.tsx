'use client'

import UpdateReservation from "@/components/UpdateReservation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UpdateReservationpage() {

    const urlParams = useSearchParams()
    const id = urlParams.get('id')

    const {data: session} = useSession()

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-center text-2xl sm:text-3xl font-bold font-sans mx-10 mt-5">Update Reservation</div>
            {
                session?.user.role==='admin'? <div className="text-center text-base sm:text-xl font-medium font-sans mx-10">ID: {id}</div> : null
            }
            <UpdateReservation/>
        </main>
    )
}