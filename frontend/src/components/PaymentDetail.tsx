'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PaymentDetail({reservation}:{reservation: Reservation}) { 
    
    const router = useRouter()

    return (
        <div>
            <div className="text-3xl text-black font-bold text-center p-2 m-2 mt-6">Payment Detail</div>
            <div className="text-xl text-black font-bold text-center">Total cost : {reservation.totalcost}</div>
            <div className="flex flex-col items-center">
                <div className="block bg-white border border-2 border-[#85C2EE] shadow-xl mx-5 my-8 w-[50vw] py-8 pl-8 rounded-lg">
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
                <button className="text-lg text-white bg-cyan-450 py-2 rounded-lg w-[180px] hover:bg-cyan-700 mb-24" onClick={() => router.push(`/payment/${reservation._id}`)} >Confirm Payment</button>
            </div>
        </div>
    )
}