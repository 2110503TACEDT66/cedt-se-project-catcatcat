'use client'
import Link from "next/link"
import deleteReservation from "@/libs/deleteReservation"



export default function Request(){
    return (
        <div>
            <div className="bg-white border rounded border-sky-900 shadow-lg px-5 mx-5 py-2 my-5 w-[80%]">
                <div className="text-xl text-black font-bold pb-2">Reservation Id</div>
                <div className="text-sm text-gray-700">User Id</div>

                <div className="my-2 flex flex-col justify-start text-center sm:flex-row space-x-0 space-y-1 sm:space-x-4 sm:space-y-0">
                    <Link href='/request/view'>
                        <button className="text-sm text-white bg-cyan-450 py-2 rounded-lg w-[180px] hover:bg-cyan-700">View</button>
                    </Link>
                    <button className="text-sm text-white bg-rose-red py-2 rounded-lg w-[180px] hover:bg-rose-700">Remove Reservation</button>
                </div>
            </div>
        </div>
    )
}