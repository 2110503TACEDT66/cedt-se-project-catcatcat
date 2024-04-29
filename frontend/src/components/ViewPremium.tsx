'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import updatePremiumStatus from "@/libs/updatePremiumStatus"
import updateUser from "@/libs/updateUser"

export default function ViewPremium({premiumTransaction}: {premiumTransaction: getPremiumTransaction}){

    const {data: session} = useSession();
    const router = useRouter();

    if(!session) return null

    const refuseScreen = useRef<HTMLDivElement>(null)
    const confirmScreen = useRef<HTMLDivElement>(null)
    const waitingRefuse = useRef<HTMLDivElement>(null)
    const waitingConfirm = useRef<HTMLDivElement>(null)

    const onClickRefuse = () => {
        if (session) {
            if (refuseScreen.current) refuseScreen.current.classList.toggle('hidden')
            if (waitingRefuse.current) waitingRefuse.current.classList.toggle('hidden')
            updatePremiumStatus({id: premiumTransaction._id, status: 'failed'}, session.user.token)
            .then(() => {
                router.push('/mypremium')
                router.refresh()
            })
        }
    }

    const onClickConfirm = () => {
        if (session) {
            if (confirmScreen.current) confirmScreen.current.classList.toggle('hidden')
            if (waitingConfirm.current) waitingConfirm.current.classList.toggle('hidden')

            const days = premiumTransaction.membership === 'Individual(year)'? 365 : 30

            let date
            if (premiumTransaction.user.expire) {
                date = new Date(premiumTransaction.user.expire)
            } else {
                date = new Date()
            }

            date.setDate(date.getDate() + days)
            date.setHours(24, 0, 0, 0)

            updateUser({id: premiumTransaction.user._id, role: 'premium', expire: date.toISOString()}, session.user.token)
            .then(() => {
                updatePremiumStatus({id: premiumTransaction._id, status: 'success'}, session.user.token)
                .then(() => {
                    router.push('/mypremium')
                    router.refresh()
                })
            })
        }
    }
    
    return(
        <div className="text-center m-10">
            {
                session?.user.role === 'admin'?
                <div className="bg-gradient-to-r from-gray-900 via-amber-500 to-gray-100 text-transparent bg-clip-text text-3xl font-bold text-center p-2 mt-8">Premium Transaction ID: {premiumTransaction?._id}</div>
                : <div className="bg-gradient-to-r from-gray-900 via-amber-500 to-gray-100 text-transparent bg-clip-text text-3xl font-bold text-center p-2 mt-8">Premium Transaction Datails</div>
            }
            <div className="flex flex-col items-center">
                <div className="block bg-white border border-3 border-[#DFB36F] shadow-xl mx-5 my-10 w-[50vw] pb-8 rounded-lg">
                    <div className="block bg-white border border-2 border-[#000000] shadow-xl w-80% h-50% rounded-lg mx-8 mt-8 text-left">
                        <div className="text-lg font-bold ml-5 mt-3">User ID: {premiumTransaction.user._id}</div>
                        <div className="text-base ml-5">Membership Type: {premiumTransaction.membership}</div>
                        <div className="text-base ml-5 mb-2">Cost: {premiumTransaction.cost}</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xl font-bold text-left ml-8 mt-5">Bank: {premiumTransaction?.bank}</div>
                        <div className="text-xl font-bold text-left ml-8">Transaction slip:</div>
                        <div className="font-medium flex justify-center">
                            {premiumTransaction? <img src={premiumTransaction.slip} className="h-[20vw]"/> : 'No transaction slip yet'}
                        </div>
                        {
                            premiumTransaction?.membership === 'Student'?
                            <div>
                                <div className="text-xl font-bold text-left ml-8">Student Card:</div>
                                <div className="font-medium flex justify-center">
                                    {premiumTransaction? <img src={premiumTransaction.studentcard} className="h-[20vw]"/> : 'No student card yet'}
                                </div>
                            </div>:null
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-12 justify-center">
                {
                    session?.user.role === 'admin'?
                    <div className="space-x-12">
                        {
                            premiumTransaction?.status !== 'failed'? 
                            <button className="text-lg text-white bg-rose-red py-2 rounded-lg w-[180px] hover:bg-rose-700" onClick={(e) => {if (refuseScreen.current) refuseScreen.current.classList.toggle('hidden')}}>Refuse</button>
                            : null
                        }
                        {
                            premiumTransaction?.status !== 'success'? 
                            <button className="text-lg text-white bg-green-500 py-2 rounded-lg w-[180px] hover:bg-green-600" onClick={(e) => {if (confirmScreen.current) confirmScreen.current.classList.toggle('hidden')}}>Confirm</button>
                            : null
                        }
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