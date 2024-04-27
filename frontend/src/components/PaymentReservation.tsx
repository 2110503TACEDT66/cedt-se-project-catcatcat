'use client'

import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import { useState, useRef } from "react"
import { useSession } from "next-auth/react"
import addTransaction from "@/libs/addTransaction"
import updateReservationStatus from "@/libs/updateReservationStatus"

export default function PaymentReservation({ reservation }: { reservation: Reservation }) {

    const router = useRouter()

    const { data: session } = useSession()

    const [bank, setBank] = useState<string>("null")
    const [status, setStatus] = useState<string|null>(null)

    const confirmPayment = () => {
        if (session && image && bank !== "null") {
            setStatus(null)

            if (waitingPopup.current) waitingPopup.current.classList.toggle('hidden')

            const transaction: TransactionItem = {
                reservation: reservation._id,
                user: session.user.token,
                totalcost: reservation.totalcost,
                bank: bank,
                slip: image
            }

            addTransaction(transaction, session.user.token)
                .then(() => {
                    updateReservationStatus({ id: reservation._id, status: 'pending' }, session.user.token)
                        .then(() => {
                            router.push(`/myreservation`)
                            router.refresh()
                        })
                })
                .catch(err => {
                    console.log(err)
                    if (waitingPopup.current) waitingPopup.current.classList.toggle('hidden')
                })
        } else {
            setStatus('Please enter transaction details')
        }
    }

    const [image, setImage] = useState<any | null>(null)

    const waitingPopup = useRef<HTMLDivElement>(null)

    function convertToBase64(e: any) {
        var reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setImage(reader.result)
            }
            reader.onerror = error => {
                console.log("Error: ", error)
            }
        }
    }

    return (
        <div>
            <div className="text-3xl text-black font-bold text-center p-2 m-2 mt-8">Payment Confirmation</div>
            <div className="flex flex-col items-center">
                <div className="block bg-white border border-2 border-[#85C2EE] shadow-xl mx-5 my-8 w-[50vw] pb-8 rounded-lg">
                    <div className="block bg-white border border-2 border-[#000000] shadow-xl w-80% h-50% rounded-lg mx-8 mt-8 text-left">
                        <div className="text-lg font-bold ml-5 mt-3">{reservation.coworkingspace.name}</div>
                        <div className="text-base ml-5">Start time: {dayjs(reservation.reserveStartTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                        <div className="text-base ml-5 ">End time: {dayjs(reservation.reserveEndTime).subtract(7, 'hour').format('DD/MM/YYYY HH:mm')}</div>
                        <div className="text-base ml-5 mb-3">cost: {reservation.totalcost}</div>
                    </div>
                    <div className="flex mt-5 items-center">
                        <p className="text-xl font-bold text-left ml-8">Banking : </p>
                        <select
                            className="text-base ml-4 border border-gray-300 rounded-lg p-2 mt-2"
                            onChange={(e) => setBank(e.target.value)}>
                            <option value="null">Choose Bank</option>
                            <option value="Kbank">Kbank</option>
                            <option value="SCB">SCB</option>
                            <option value="PromptPay">PromptPay</option>
                        </select>
                    </div>
                    
                    <div className="text-xl font-bold text-left ml-8 mt-5">Transaction slip: </div>
                    <div className="mx-8 mt-2 space-y-4">
                        <input accept="image/*" type="file" onChange={convertToBase64} />
                        {
                            image ?
                                <div className="flex justify-center">
                                    <img src={image} className="h-[20vw]" />
                                </div> : null
                        }
                    </div>
                    {
                        status?
                        <div className="text-center text-red-500 mt-5">{status}</div>
                        : null
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <button className="text-lg text-white bg-cyan-450 py-2 px-8 rounded-lg hover:bg-cyan-700 mb-24" onClick={confirmPayment}>Confirm Payment</button>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={waitingPopup}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4 text-center">
                    <div className="text-2xl font-bold mb-4">Sending the confirmation payment...</div>
                    <div>Please wait a moment</div>
                </div>
            </div>
        </div>
    )
}