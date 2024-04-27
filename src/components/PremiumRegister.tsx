'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import addPremiumTransaction from "@/libs/addPremiumTransaction"

export default function PaymentReservation({plan} : {plan : string}) {

    const router = useRouter()
    const {data: session} = useSession()

    if (!session) return null

    const [imgTransaction, setImgTransaction] = useState<any | null>(null)
    const [imgStudent, setImgStudent] = useState<any | null>(null)
    const [bank, setBank] = useState<string>("null")
    const [status, setStatus] = useState<string|null>(null)

    const waitingPopup = useRef<HTMLDivElement>(null)

    function transactionImage(e: any) {
        var reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setImgTransaction(reader.result)
            }
            reader.onerror = error => {
                console.log("Error: ", error)
            }
        }
    }

    function studentImage(e: any) {
        var reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setImgStudent(reader.result)
            }
            reader.onerror = error => {
                console.log("Error: ", error)
            }
        }
    }

    const confirmPayment = () => {
        if (session && imgTransaction && imgStudent && bank !== "null") {
            setStatus(null)

            if (waitingPopup.current) waitingPopup.current.classList.toggle('hidden')

            const transaction: PremiumTransactionItem = {
                membership: plan==='student-month'? 'Student' : plan==='individual-month'? 'Individual(month)' : 'Individual(year)',
                cost: plan==='student-month'? '129' : plan==='individual-month'? '199' : '1990',
                bank: bank,
                studentcard: imgStudent,
                slip: imgTransaction
            }

            addPremiumTransaction(transaction, session.user.token)
                .then(() => {
                    // updateReservationStatus({ id: reservation._id, status: 'pending' }, session.user.token)
                    //     .then(() => {
                    //         router.push(`/myreservation`)
                    //         router.refresh()
                    //     })
                    router.push(`/`)
                })
                .catch(err => {
                    console.log(err)
                    if (waitingPopup.current) waitingPopup.current.classList.toggle('hidden')
                })
        } else if (plan !== 'student-month' && session && imgTransaction && bank !== "null") {
            setStatus(null)

            if (waitingPopup.current) waitingPopup.current.classList.toggle('hidden')

            const transaction: PremiumTransactionItem = {
                membership: plan==='student-month'? 'Student' : plan==='individual-month'? 'Individual(month)' : 'Individual(year)',
                cost: plan==='student-month'? '129' : plan==='individual-month'? '199' : '1990',
                bank: bank,
                studentcard: '',
                slip: imgTransaction
            }

            addPremiumTransaction(transaction, session.user.token)
                .then(() => {
                    // updateReservationStatus({ id: reservation._id, status: 'pending' }, session.user.token)
                    //     .then(() => {
                    //         router.push(`/myreservation`)
                    //         router.refresh()
                    //     })
                    router.push(`/`)
                })
                .catch(err => {
                    console.log(err)
                    if (waitingPopup.current) waitingPopup.current.classList.toggle('hidden')
                })
        } else {
            setStatus('Please enter transaction details')
        }
    }
    

    return (
        <div>
            <div className="bg-gradient-to-r from-gray-900 via-amber-500 to-gray-100 text-transparent bg-clip-text text-3xl font-bold text-center p-2 m-2 mt-8">Payment Confirmation</div>
            <div className="flex flex-col items-center">
                <div className="block bg-white border border-2 border-[#DFB36F] shadow-xl mx-5 my-8 w-[50vw] pb-8 rounded-lg">
                    <div className="block bg-white border border-2 border-gray-500 shadow-xl w-80% h-50% rounded-lg mx-8 mt-8 mb-5 text-left">
                        <div className="text-lg font-bold ml-5 mt-3">Username: {session.user.name}</div>
                        <div className="text-base ml-5">Membership: { plan==='student-month'? 'Student' : plan==='individual-month'? 'Individual (month)' : 'Individual (year)'}</div>
                        <div className="text-base ml-5 mb-3">Cost: { plan==='student-month'? '129' : plan==='individual-month'? '199' : '1990'} Baht</div>
                    </div>
                    <div className="flex mt-2 items-center">
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
                    
                    <div className="text-xl font-bold text-left ml-8 mt-5">
                      Transaction slip: 
                    </div>
                    <div className="mx-8 mt-2 space-y-4">
                        <input accept="image/*" type="file" onChange={transactionImage} />
                        {
                            imgTransaction ?
                                <div className="flex justify-center">
                                    <img src={imgTransaction} className="h-[20vw]" />
                                </div> : null
                        }
                    </div>

                    {
                        plan==='student-month'?
                        <div>
                            <div className="text-xl font-bold text-left ml-8 mt-5">
                                Student card: 
                            </div>
                            <div className="mx-8 mt-2 space-y-4">
                                <input accept="image/*" type="file" onChange={studentImage} />
                                {
                                    imgStudent ?
                                        <div className="flex justify-center">
                                            <img src={imgStudent} className="h-[20vw]" />
                                        </div> : null
                                }
                            </div>
                        </div>
                        : null
                    }
                    {
                        status?
                        <div className="text-center text-red-500 mt-5">{status}</div>
                        : null
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <button className="text-white bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-red-400 rounded-lg text-lg bg-cyan-450 py-2 rounded-lg w-[200px] hover:bg-cyan-700 mb-24" onClick={confirmPayment} >Confirm Payment</button>
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