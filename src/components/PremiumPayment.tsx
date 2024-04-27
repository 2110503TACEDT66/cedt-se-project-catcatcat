'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PremiumPayment({plan} : {plan: string}) { 
    
    const router = useRouter()
    
    return (
        <div>
            <div className="bg-gradient-to-r from-gray-900 via-amber-500 to-gray-100 text-transparent bg-clip-text text-3xl font-bold text-center p-2 m-2 mt-6">Premium Payment Detail</div>
            <div className="text-xl text-gray-800 font-bold text-center">Total cost : { plan==='student-month'? '129' : plan==='individual-month'? '199' : '1990'} Baht</div>
            <div className="flex flex-col items-center">
                <div className="block bg-white border border-2 border-[#DFB36F] shadow-xl mx-5 my-8 w-[50vw] py-8 pl-8 rounded-lg">
                    <div className="text-xl text-black font-bold mb-4">Choose Bank</div>
                    <div className="flex flex-row">
                        <div className="pt-2 pl-3"><Image alt='kbank' src="/img/kbank.png" width={60} height={60}/></div>
                        <div className="ml-6 mb-5">
                            <div className="text-lg text-black font-bold">Kbank</div>
                            <div>account : catcatcat </div>
                            <div>account number : 081-x-xxxxx-0</div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                    <div className="pt-2 pl-3"><Image alt='kbank' src="/img/scb.png" width={60} height={60}/></div>
                        <div className="ml-6 mb-5">
                            <div className="text-lg text-black font-bold">SCB</div>
                            <div>account : catcatcat </div>
                            <div>account number : 060-x-xxxxx-0</div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                    <div className="pt-5"><Image alt='kbank' src="/img/payment.png" width={72} height={0}/></div>
                        <div className="ml-6">
                            <div className="text-lg text-black font-bold">PromptPay</div>
                            <div>account : catcatcat </div>
                            <div>account number : 062-x-xxxxx-0</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="flex justify-center">
                <button className="text-white bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-red-400 rounded-lg text-lg bg-cyan-450 py-2 rounded-lg w-[200px] hover:bg-cyan-700 mb-24"
                onClick={() => router.push(`/premium/registration/${plan}`)}>
                    Confirm Payment
                </button>
            </div>
        </div>
    )
}