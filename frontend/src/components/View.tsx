'use client'

import dayjs from "dayjs"
import { useSession } from "next-auth/react"
import updateReservationStatus from "@/libs/updateReservationStatus"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import Link from "next/link"

export default function View({reservation, transaction} : {reservation:Reservation, transaction: Transaction|null}){
    

    return (
        <div className="text-center m-10">
            {
                session?.user.role === 'admin'?
                <div className="text-3xl m-2 text-black font-bold">Reservation ID: {reservation._id}</div>
                : <div className="text-3xl m-2 text-black font-bold">Reservation Details</div>
            }
            <div className="flex flex-col items-center">
                <div className="block bg-white border border-2 border-[#85C2EE] shadow-xl mx-5 my-10 w-[50vw] pb-8 rounded-lg">
                    <div className="block bg-white border border-2 border-[#000000] shadow-xl w-80% h-50% rounded-lg mx-8 mt-8 text-left">
                        <div className="text-lg font-bold ml-5 mt-3">{reservation.coworkingspace.name}</div>
                        {
                            session?.user.role === 'admin'?
                            <div className="text-base ml-5">User ID: {reservation.user}</div> : null
                        }
                        <div className="text-base ml-5">Start time: {dayjs(reservation.reserveStartTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                        <div className="text-base ml-5">End time: {dayjs(reservation.reserveEndTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                        <div className="text-base ml-5 mb-3">Cost: {reservation.totalcost} Baht</div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-xl font-bold text-left ml-8 mt-5">Transaction slip: </div>
                        <div className="font-medium flex justify-center">
                            { transaction? <img src={transaction.slip} className="h-[20vw]"/> : 'No transaction slip yet' }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-12 justify-center">
                {
                    session?.user._id === reservation.user && !transaction?
                    <Link className="text-lg text-white bg-cyan-450 py-2 px-4 rounded-lg hover:bg-cyan-700" href={`/payment/${reservation._id}`}>Add Transaction Slip</Link>
                    : null
                }
                {
                    session?.user.role === 'admin'?
                    <div className="space-x-12">
                        <button className="text-lg text-white bg-rose-red py-2 rounded-lg w-[180px] hover:bg-rose-700" onClick={(e) => {if (refuseScreen.current) refuseScreen.current.classList.toggle('hidden')}}>Refuse</button>
                        <button className="text-lg text-white bg-green-500 py-2 rounded-lg w-[180px] hover:bg-green-600" onClick={(e) => {if (confirmScreen.current) confirmScreen.current.classList.toggle('hidden')}}>Confirm</button>
                    </div>
                    : null
                }
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={refuseScreen}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                    <div className="text-2xl font-bold mb-4">Are you sure to refuse this reservation?</div>
                    <div className='space-x-4 flex justify-end'>
                        <button className="mt-4 px-4 py-2 text-black rounded-lg border-2 border-black" onClick={(e) => {if (refuseScreen.current) refuseScreen.current.classList.toggle('hidden')}}>
                        Close
                        </button>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={onClickRefuse}>
                        Refuse
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={confirmScreen}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                    <div className="text-2xl font-bold mb-4">Are you sure to confirm this reservation?</div>
                    <div className='space-x-4 flex justify-end'>
                        <button className="mt-4 px-4 py-2 text-black rounded-lg border-2 border-black" onClick={(e) => {if (confirmScreen.current) confirmScreen.current.classList.toggle('hidden')}}>
                        Close
                        </button>
                        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" onClick={onClickConfirm}>
                        Confirm
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={waitingRefuse}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                    <div className="text-2xl font-bold mb-4">Refusing the reservation...</div>
                    <div>Please wait a moment</div>
                </div>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={waitingConfirm}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                    <div className="text-2xl font-bold mb-4">Confirming the reservation...</div>
                    <div>Please wait a moment</div>
                </div>
            </div>
        </div>
    )
}