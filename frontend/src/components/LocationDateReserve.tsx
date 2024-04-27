'use client'

import * as React from 'react';
import { useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function LocationDateReserve({onDateChange} : {onDateChange: Function}) {
    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null)


    return (
        <div className="rounded-lg w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    className='w-full'
                    value={reserveDate}
                    onChange={(value) => {setReserveDate(value); onDateChange(value)}}
                />
            </LocalizationProvider>
        </div>
    )
}