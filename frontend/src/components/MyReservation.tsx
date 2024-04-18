'use client'

import deleteReservation from "@/libs/deleteReservation"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from "dayjs"
import { useState, useRef } from "react"

export default function MyReservation({ reservations, user }: { reservations: Reservations, user: UserSession }) {

    const router = useRouter()
    router.refresh()

    const sortedReservations = [...reservations.data].sort((a: Reservation, b: Reservation) => {
        if (a.status === 'pending') return -1;
        if (a.status === 'failed' && b.status !== 'pending') return -1;
        if (a.status === 'success' && b.status !== 'pending' && b.status !== 'failed') return -1;
        return 1;
    });

    const removeConfirm = useRef<HTMLDivElement>(null)
    const waitingRemove = useRef<HTMLDivElement>(null)

    const [item, setItem] = useState<Reservation | null>(null)

    const removeReservationButton = (item: Reservation) => {
        if (removeConfirm.current) removeConfirm.current.classList.toggle('hidden')
        setItem(item)
    }

    const removeReservation = () => {
        if (item) {
            if (removeConfirm.current) removeConfirm.current.classList.toggle('hidden')
            if (waitingRemove.current) waitingRemove.current.classList.toggle('hidden')
            deleteReservation(item._id, user.token)
                .then(() => {
                    router.refresh()
                    if (waitingRemove.current) waitingRemove.current.classList.toggle('hidden')
                })
        }
    }
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const handleChangeStatus = (status: string) => {
        setSelectedStatus(status);
    };

    return (
        <div>
            <div className=" flex justify-end px-5 mx-5 py-2 my-5 ">
                <select
                    className={`px-3 py-1 border rounded ${selectedStatus === 'pending' ? 'border-[#E39D48]' : selectedStatus === 'waiting' ? 'border-gray-500' : selectedStatus === 'success' ? 'border-teal-500' : selectedStatus === 'failed' ? 'border-red-400' : 'border-sky-900'}`}
                    value={selectedStatus}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="waiting">Waiting</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
            {

                sortedReservations.length !== 0 ?
                    sortedReservations
                        .filter((item: Reservation) => {
                            if (selectedStatus === 'all') return true;
                            return item.status === selectedStatus;
                        })
                        .map((item: Reservation) => (
                            <div className="bg-white border rounded border-sky-900 shadow-lg px-5 mx-5 py-2 my-5 w-[80%]" key={item._id}>
                                <div className="float-right my-2 flex flex-col justify-between text-center sm:flex-row">
                                    {
                                        item.status === 'waiting' ? <div className="text-xl text-gray-500 font-bold pb-2 py-2">Waiting for payment</div> : null
                                    }
                                    {
                                        item.status === 'pending' ? <div className="text-xl text-[#E39D48] font-bold pb-2 py-2">Pending Approval</div> : null
                                    }
                                    {
                                        item.status === 'success' ? <div className="text-xl text-teal-500 font-bold pb-2 py-2">Success</div> : null
                                    }
                                    {
                                        item.status === 'failed' ? <div className="text-xl text-red-400 font-bold pb-2 py-2">Failed</div> : null
                                    }
                                </div>
                                <div className="text-xl text-black font-bold pb-2 py-2">{item.coworkingspace.name}</div>
                                {
                                    user.role === 'admin' ? <div className="text-sm text-gray-700">User ID: {item.user}</div> : null
                                }
                                <div className="text-sm text-gray-700">Start time: {dayjs(item.reserveStartTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                                <div className="text-sm text-gray-700">End time: {dayjs(item.reserveEndTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                                <div className="text-sm text-gray-700">Cost: {item.totalcost} Baht</div>
                                <div className="my-2 flex flex-col justify-between text-center sm:flex-row">
                                    <div className="flex flex-col justify-start text-center sm:flex-row space-x-0 space-y-1 sm:space-x-4 sm:space-y-0">
                                        <Link href={`/update?id=${item._id}&startTime=${item.reserveStartTime}&endTime=${item.reserveEndTime}`}
                                            className="text-sm text-white bg-cyan-450 py-2 rounded-lg w-[180px] hover:bg-cyan-700">Update Reservation</Link>
                                        <button className="text-sm text-white bg-rose-red py-2 rounded-lg w-[180px] hover:bg-rose-700"
                                            onClick={() => removeReservationButton(item)}>Remove Reservation</button>
                                        <Link href={`/myreservation/view/${item._id}`}>
                                            <button className="text-sm text-white bg-[#2DD397] py-2 rounded-lg w-[180px] hover:bg-[#0E9C69]">View</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    : <div className="flex justify-center items-center text-center text-lg md:text-xl lg:text-2xl font-bold mt-[80px] mx-[50px]">You don't have any reservations</div>
            }
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={removeConfirm}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                    <div className="text-2xl font-bold mb-4">Are you sure to remove this reservation?</div>
                    <div className='space-x-4 flex justify-end'>
                        <button className="mt-4 px-4 py-2 text-black rounded-lg border-2 border-black" onClick={(e) => { if (removeConfirm.current) removeConfirm.current.classList.toggle('hidden') }}>
                            Close
                        </button>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={removeReservation}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={waitingRemove}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4 text-center">
                    <div className="text-2xl font-bold mb-4">Removing the reservation...</div>
                    <div>Please wait a moment</div>
                </div>
            </div>
        </div>
    )
}







