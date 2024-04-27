import Card from "./Card"
import Link from "next/link"
import { getServerSession } from "next-auth";
import authOptions from '@/libs/auth/authOptions';

export default async function CwsCatalog({cwsJson} : {cwsJson: Coworkingspaces}) {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <div className="mt-5 text-xl text-slate-700 justify-around">All {cwsJson.count} Co-working Spaces</div>
            <div className="block m-10 sm:m-3 md:m-5 lg:m-15 flex flex-wrap justify-left">
                {
                    cwsJson.data.map((cwsItem:CoworkingspacesItem)=>(
                        <Link href={`/coworkingspace/${cwsItem._id}`} className="w-[100%] sm:w-[50%] md:w-[33%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-6">
                            <Card cwsName={cwsItem.name} imgSrc={cwsItem.image} />
                        </Link>
                    ))
                }
                {
                    (session?.user.role === "admin") ?
                    <Link href={`/addcoworkingspace`} className="w-[100%] sm:w-[50%] md:w-[33%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-6">
                        <div className="flex flex-col items-center justify-center w-full h-[300px] rounded-lg border border-2 border-gray-400 border-dashed">
                            <div className="text-neutral-400">Add new</div>
                            <div className="text-neutral-400">Co-working Spaces</div>         
                        </div>
                    </Link>
                    : null
                }
            </div>
        </div>
    )
}