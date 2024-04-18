'use client'

import { Select, MenuItem } from "@mui/material";
import LocationDateReserve from "@/components/LocationDateReserve"
import { Dayjs } from "dayjs"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import addReservation from "@/libs/addReservation"
import { useSession } from "next-auth/react";

export default function CwsSelector({cws} : {cws: Coworkingspaces}) {

    const urlParams = useSearchParams()
    const id = urlParams.get('id')

    const router = useRouter()

    const [cwSpace, setCwSpace] = useState<string|null>(id)
    const [startTime, setStartTime] = useState<Dayjs|null>(null)
    const [endTime, setEndTime] = useState<Dayjs|null>(null)
    const [reserveStatus, setReserveStatus] = useState<string|null>(null)

    const {data: session} = useSession()

    const handleClick = () => {
        if (!session) return

        if (cwSpace && startTime && endTime) {
            const reservationItem: ReservationItem = {
                userName: session.user.name,
                cwsID: cwSpace,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString()
            }

            addReservation(reservationItem, session.user.token)
                .then(() => {
                    setReserveStatus('Reserved successfully')
                    router.push('/myreservation')
                    router.refresh()
                })
                .catch(err => {
                    setReserveStatus(err.message)
                })

        } else {
            setReserveStatus('Please enter reserve informations')
        }
    }

    return (
        <div className="bg-blue-50 shadow-lg shadow-indigo-200 rounded-lg flex flex-col justify-center items-center p-6 w-[300px] sm:w-[400px] lg:w-[600px] space-y-5">
            <table className="table-fixed text-left border-separate border-spacing-2 w-full">
                <tbody>
                    <tr>
                        <th className="w-[90px] sm:w-[110px] lg:w-[160px]">
                            <div className="text-sm font-semibold sm:text-base sm:font-bold">
                                Co-working Space
                            </div>
                        </th>
                        <th>
                        <Select variant="outlined" name="coop" id="coop" defaultValue={id}
                            className="bg-white w-[100%] rounded-md border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent box-border"
                            onChange={(e) => { setCwSpace(e.target.value) }}>

                            {cws.data.map((cwsItem) => (
                                <MenuItem key={cwsItem._id} value={cwsItem._id}>
                                    {cwsItem.name}
                                </MenuItem>
                            ))}
                            
                        </Select>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div className="text-sm font-semibold sm:text-base sm:font-bold">
                                Start time
                            </div>
                        </th>
                        <th>
                            <LocationDateReserve onDateChange={(value: Dayjs) => { setStartTime(value.add(7, 'hour')) }} />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div className="text-sm font-semibold sm:text-base sm:font-bold">
                                End time
                            </div>
                        </th>
                        <th>
                            <LocationDateReserve onDateChange={(value: Dayjs) => { setEndTime(value.add(7, 'hour')) }} />
                        </th>
                    </tr>
                </tbody>
            </table>
            <button className="rounded-xl bg-sky-500 hover:bg-slate-700 px-6 py-2 text-white shadow-sm" onClick={handleClick}>
                Reserve
            </button>

            {
                reserveStatus? <div className="text-center"> {reserveStatus} </div> : null
            }
        </div>
    )
}