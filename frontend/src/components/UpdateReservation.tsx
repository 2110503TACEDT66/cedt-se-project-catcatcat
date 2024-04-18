'use client'

import LocationDateReserve from "@/components/LocationDateReserve"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import updateReservation from "@/libs/updateReservation";

export default function UpdateReservation() { 

    const urlParams = useSearchParams()
    const id = urlParams.get('id')
    const startTime = urlParams.get('startTime')
    const endTime = urlParams.get('endTime')

    if (!id) return

    const router = useRouter()

    const [reserveStartTime, setStartTime] = useState<Dayjs>(dayjs(startTime))
    const [reserveEndTime, setEndTime] = useState<Dayjs>(dayjs(endTime))
    const [reserveStatus, setReserveStatus] = useState<string|null>(null)

    const {data: session} = useSession()

    const handleClick = () => {
        if (!session) return

        if (startTime && endTime) {
            const reservationItem: any = {
                id: id,
                startTime: reserveStartTime.toISOString(),
                endTime: reserveEndTime.toISOString()
            }

            updateReservation(reservationItem, session.user.token)
                .then(() => {
                    setReserveStatus('Updated successfully')
                    router.push('/myreservation')
                    router.refresh()
                })
                .catch(err => {
                    setReserveStatus(err.message)
                })

        } else {
            setReserveStatus('Please enter update reserve informations')
        }
    } 
 

    return (
        <div className="w-4/5 sm:w-3/4 md:w-7/12 xl:w-1/2 space-y-5 bg-white border border-sky-300 p-10 flex flex-col shadow-lg shadow-indigo-200 rounded-lg">
            <div className="lg:pl-8 xl:pl-10">
            <div className="block sm:hidden text-md text-cyan-400 font-bold">
                    Start time
            </div>
                <div className="flex items-center space-x-2">
                    <div className="hidden sm:block text-md text-left text-cyan-400 w-1/3 font-bold">
                        Start time
                    </div>
                    <div className="w-full sm:w-2/3">
                        <LocationDateReserve onDateChange={(value: Dayjs) => { setStartTime(value.add(7, 'hour')) }} />
                    </div>
                </div>
            </div>
            <div className="lg:pl-8 xl:pl-10">
                <div className="block sm:hidden text-md text-cyan-400 font-bold">
                        End time
                </div>
                <div className="flex items-center space-x-2">
                    <div className="hidden sm:block text-md text-left text-cyan-400 w-1/3 font-bold">
                        End time
                    </div>
                    <div className="w-full sm:w-2/3">
                        <LocationDateReserve onDateChange={(value: Dayjs) => { setEndTime(value.add(7, 'hour')) }} />
                    </div>
                </div>
            </div>
            <button className="block rounded-full bg-teal-500 hover:bg-teal-700 px-6 py-3 text-white shadow-sm font-bold uppercase tracking-wide" onClick={handleClick}>
                Update
            </button>

            {
                reserveStatus? <div className="text-center"> {reserveStatus} </div> : null
            }
        </div>
    )
}
//