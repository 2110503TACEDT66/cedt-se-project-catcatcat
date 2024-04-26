'use client'

import { useRouter } from "next/navigation"

export default function PaymentReservation() {

    const router = useRouter()


    return (
        <div>
            <div className="bg-gradient-to-r from-gray-900 via-amber-500 to-gray-100 text-transparent bg-clip-text text-3xl font-bold text-center p-2 m-2 mt-6">Payment Confirmation</div>
            <div className="flex flex-col items-center">
                <div className="block bg-white border border-2 border-[#DFB36F] shadow-xl mx-5 my-8 w-[50vw] pb-8 rounded-lg">
                    <div className="block bg-white border border-2 border-gray-500 shadow-xl w-80% h-50% rounded-lg mx-8 mt-8 text-left">
                        <div className="text-lg font-bold ml-5 mt-3">Username</div>
                        <div className="text-base ml-5">User ID: </div>
                        <div className="text-base ml-5 mb-3">cost:</div>
                    </div>
                    <div className="flex mt-5 items-center">
                        <p className="text-xl font-bold text-left ml-8">ประเภท : </p>
                        <select
                            className="text-base ml-4 border border-gray-300 rounded-lg p-2 mt-2"
                            >
                            <option value="null">เลือกประเภท</option>
                            <option value="student">Student</option>
                            <option value="individual">Individual</option>
                        </select>
                    </div>
                    <div className="flex mt-2 items-center">
                        <p className="text-xl font-bold text-left ml-8">Banking : </p>
                        <select
                            className="text-base ml-4 border border-gray-300 rounded-lg p-2 mt-2"
                            >
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
                        <input accept="image/*" type="file" />
                    </div>
                    
                    <div className="text-xl font-bold text-left ml-8 mt-5">
                      Student card: 
                    </div>
                    <div className="mx-8 mt-2 space-y-4">
                        <input accept="image/*" type="file" />
                    </div>

                </div>
            </div>
            <div className="flex justify-center">
                <button className="text-white bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-red-400 rounded-lg text-lg bg-cyan-450 py-2 rounded-lg w-[200px] hover:bg-cyan-700 mb-24" onClick={() => router.push(`/`)} >Confirm Payment</button>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
                <div className="bg-white p-8 rounded-lg shadow-md mx-4 text-center">
                    <div className="text-2xl font-bold mb-4">Sending the confirmation payment...</div>
                </div>
            </div>
        </div>
    )
}