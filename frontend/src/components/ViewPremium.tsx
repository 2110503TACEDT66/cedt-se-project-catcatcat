'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function ViewPremium({user, premiumTransaction}: {user: User, premiumTransaction: PremiumTransaction|null}){

    const {data: session} = useSession();
    const router = useRouter();

    if(!session) return null

    return(
        <div className="text-center m-10">
            {
                session?.user.role === 'admin'?
                <div className="text-3xl m-2 text-black font-bold">User ID: {user.name}</div>
                :<div className="text-3xl m-2 text-black font-bold">Premiun Details</div>
            }
            <div className="block bg-white border border-2 border-gray-500 shadow-xl w-80% h-50% rounded-lg mx-8 mt-8 mb-5 text-left">
                <div className="text-lg font-bold ml-5 mt-3">Username: {session.user.name}</div>
                <div className="text-base ml-5">Membership: { premiumTransaction?.membership}</div>
                <div className="text-base ml-5 mb-3">Cost: { premiumTransaction?.cost} Baht</div>
            </div>
            <div className="space-y-2">
                <div className="text-xl font-bold text-left ml-8 mt-5">Bank: { premiumTransaction?.bank} Baht</div>
                <div className="text-xl font-bold text-left ml-8">Transaction slip: </div>
                <div className="font-medium flex justify-center">
                    { premiumTransaction? <img src={premiumTransaction.slip} className="h-[20vw]"/> : 'No transaction slip yet' }
                </div>
                {
                    premiumTransaction?.membership==='Student'?
                    <div className="font-medium flex justify-center">
                        { premiumTransaction? <img src={premiumTransaction.studentcard} className="h-[20vw]"/> : 'No student card yet' }
                    </div>
                    : null
                }
            </div>
            <div className="flex flex-row space-x-12 justify-center">
                {
                    session?.user._id === reservation.user && !transaction?
                    <Link className="text-lg text-white bg-cyan-450 py-2 px-4 rounded-lg hover:bg-cyan-700" href={`/payment/${reservation._id}`}>Add Transaction Slip</Link>
                    : null
                }
                {
                    session?.user.role === 'admin'?
                    <div className="space-x-12">
                        {
                            reservation.status !== 'failed'? 
                            <button className="text-lg text-white bg-rose-red py-2 rounded-lg w-[180px] hover:bg-rose-700" onClick={(e) => {if (refuseScreen.current) refuseScreen.current.classList.toggle('hidden')}}>Refuse</button>
                            : null
                        }
                        {
                            reservation.status !== 'success'? 
                            <button className="text-lg text-white bg-green-500 py-2 rounded-lg w-[180px] hover:bg-green-600" onClick={(e) => {if (confirmScreen.current) confirmScreen.current.classList.toggle('hidden')}}>Confirm</button>
                            : null
                        }
                    </div>
                    : null
                }
            </div>

        </div>
    )
}