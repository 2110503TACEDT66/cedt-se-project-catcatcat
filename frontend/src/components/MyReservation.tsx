'use client'

import deleteReservation from "@/libs/deleteReservation"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from "dayjs"

export default function MyReservation({reservations, user} : {reservations: Reservations, user: UserSession}) {

    const router = useRouter()

    const handleUpdateReservation = (reservationId: string) => {
        router.push(`/update/${reservationId}`);
    };

    return (
        <div>
            {
                reservations.data.length !== 0?
                reservations.data.map((item: Reservation) => (
                    <div className="bg-white border rounded border-sky-900 shadow-lg px-5 mx-5 py-2 my-5 w-[80%]">
                        <div className="text-xl text-black font-bold pb-2">{item.coworkingspace.name}</div>
                        {
                            user.role==='admin'? <div className="text-sm text-gray-700">User ID: {item.user}</div> : null
                        }
                        <div className="text-sm text-gray-700">Start time: {dayjs(item.reserveStartTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                        <div className="text-sm text-gray-700">End time: {dayjs(item.reserveEndTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                        <div className="my-2 flex flex-col justify-start text-center sm:flex-row space-x-0 space-y-1 sm:space-x-4 sm:space-y-0">
                            <Link href={`/update?id=${item._id}&startTime=${item.reserveStartTime}&endTime=${item.reserveEndTime}`} onClick={() => handleUpdateReservation(item._id)}
                                className="text-sm text-white bg-cyan-450 py-2 rounded-lg w-[180px] hover:bg-cyan-700">Update Reservation</Link>
                            <button className="text-sm text-white bg-rose-red py-2 rounded-lg w-[180px] hover:bg-rose-700"
                                onClick={() => deleteReservation(item._id, user.token).then(() => {router.refresh()})}>Remove Reservation</button>
                        </div>
                    </div>
                ))
                : <div className="flex justify-center items-center text-center text-lg md:text-xl lg:text-2xl font-bold mt-[80px] mx-[50px]">You don't have any reservations</div>
            }
        </div>
    )
}