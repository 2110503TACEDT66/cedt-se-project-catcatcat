'use client'

import deletePremiumTransaction from "@/libs/deletePremiumTransaction"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useRef } from "react"
import Image from "next/image"

export default function MyPremium({ premiumTransactions, user }: { premiumTransactions: PremiumTransactions, user: UserSession }) {

    const router = useRouter()
    router.refresh()

    let sortedPremium: getPremiumTransactions[] = [];
    if (premiumTransactions && premiumTransactions.data) {
        sortedPremium = [...premiumTransactions.data].sort((a: getPremiumTransactions, b: getPremiumTransactions) => {
            if (a.status === 'pending') return -1;
            if (a.status === 'failed' && b.status !== 'pending') return -1;
            if (a.status === 'success' && b.status !== 'pending' && b.status !== 'failed') return -1;
            return 1;
        });
    } else {
        sortedPremium.length = 0;
    }

    const removeConfirm = useRef<HTMLDivElement>(null)
    const waitingRemove = useRef<HTMLDivElement>(null)

    const [item, setItem] = useState<getPremiumTransactions | null>(null)

    const removeButton = (item: getPremiumTransactions) => {
        if (removeConfirm.current) removeConfirm.current.classList.toggle('hidden')
        setItem(item)
    }

    const removePremiumRequest = () => {
        if (item) {
            if (removeConfirm.current) removeConfirm.current.classList.toggle('hidden')
            if (waitingRemove.current) waitingRemove.current.classList.toggle('hidden')
            deletePremiumTransaction(item._id, user.token)
                .then(() => {
                    router.refresh()
                    if (waitingRemove.current) waitingRemove.current.classList.toggle('hidden')
                }
            )
        }
    }

    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const handleChangeStatus = (status: string) => {
        setSelectedStatus(status);
    };

    return (
        <div>
            <div className="flex justify-end px-5 mx-5 py-2 my-5">
                <select
                    className={`px-3 py-1 border rounded ${selectedStatus === 'pending' ? 'border-[#E39D48]' : selectedStatus === 'success' ? 'border-teal-500' : selectedStatus === 'failed' ? 'border-red-400' : 'border-sky-900'}`}
                    value={selectedStatus}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
            {

                    sortedPremium.length !== 0 ?
                    sortedPremium
                        .filter((item: getPremiumTransactions) => {
                            if (selectedStatus === 'all') return true;
                            return item.status === selectedStatus;
                        })
                        .map((item: getPremiumTransactions) => (
                            <div className="bg-white border rounded border-sky-900 shadow-lg px-5 mx-[15%] py-2 my-5 w-[70%]" key={item._id}>
                                <div className="float-right my-2 flex flex-col justify-between text-center sm:flex-row">
                                    {
                                        item.status === 'pending' ? 
                                        <div className="flex flex-row">
                                            <div className="flex flex-row items-center">
                                                <div className="w-3 h-3 rounded-full bg-[#E39D48] mr-1"></div>
                                                <div className="text-md text-gray-500 font-bold">Pending Approval</div>
                                            </div>
                                            <Image className="ml-2 cursor-pointer" alt='img' src="/img/deleteicon.png" width={30} height={10} onClick={() => removeButton(item)}/>
                                        </div>: null
                                    }
                                    {
                                        item.status === 'success' ? 
                                        <div className="flex flex-row">
                                            <div className="flex flex-row items-center">
                                                <div className="w-3 h-3 rounded-full bg-teal-500 mr-1"></div>
                                                <div className="text-md text-gray-500 font-bold">Success</div>
                                            </div>
                                            <Image className="ml-2 cursor-pointer" alt='img' src="/img/deleteicon.png" width={30} height={10} onClick={() => removeButton(item)}/>
                                        </div>: null
                                    }
                                    {
                                        item.status === 'failed' ? 
                                        <div className="flex flex-row">
                                            <div className="flex flex-row items-center">
                                                <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
                                                <div className="text-md text-gray-500 font-bold">Failed</div>
                                            </div>
                                            <Image className="ml-2 cursor-pointer" alt='img' src="/img/deleteicon.png" width={30} height={10} onClick={() => removeButton(item)}/>
                                        </div>: null
                                    }
                                </div>
                                <div className="text-xl text-black font-bold pb-2 py-2">User ID: {item.user}</div>
                                <div className="text-sm text-gray-700">Membership Type: {item.membership}</div>
                                <div className="text-sm text-gray-700">Cost: {item.cost} Baht</div>
                                <div className="my-2 flex flex-col justify-between text-center sm:flex-row">
                                    <div className="flex flex-col justify-start text-center sm:flex-row space-x-0 space-y-1 sm:space-x-4 sm:space-y-0">
                                        <Link href={`/mypremium/view/${item._id}`}>
                                            <button className="text-sm text-white bg-cyan-450 py-2 rounded-lg w-[180px] hover:bg-cyan-700">View</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    : <div className="flex justify-center items-center text-center text-lg md:text-xl lg:text-2xl font-bold mt-[80px] mx-[50px]">You don't have any premium request</div>
            }
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={removeConfirm}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                    <div className="text-2xl font-bold mb-4">Are you sure to remove this request?</div>
                    <div className='space-x-4 flex justify-end'>
                        <button className="mt-4 px-4 py-2 text-black rounded-lg border-2 border-black" onClick={(e) => { if (removeConfirm.current) removeConfirm.current.classList.toggle('hidden') }}>
                            Close
                        </button>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={removePremiumRequest}>
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







