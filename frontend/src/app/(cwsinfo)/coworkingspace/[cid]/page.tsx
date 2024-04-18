import Image from 'next/image'
import getCwSpace from '@/libs/getCwSpace'
import Link from 'next/link'
import { getServerSession } from "next-auth";
import authOptions from '@/libs/auth/authOptions';

export default async function CwsDetailPage({params} : {params: {cid: string}}) {
    const cwsDetail = await getCwSpace(params.cid)
    const session = await getServerSession(authOptions)


    return (
        <main className="text-center p-5">
            <h1 className="text-3xl font-bold font-serif mt-5">{cwsDetail.data.name}</h1>
            <div className='flex flex-col items-center justify-center'>
                <Image src={cwsDetail.data.image} alt='Cws Image' width={0} height={0} sizes="100vw" className="rounded-lg w-[80%] lg:w-[70%] md:w-[60%] h-auto m-7 mr-5 sm:mr-5 lg:mr-10"/>
                <div className="text-md text-left space-y-3 space-x-7 flex flex-col items-center sm:mx-20 justify-center md:items-start md:justify-start">
                    <div className='text-xl font-semibold'>Detail:</div>
                    <table className='text-md'>
                        <tr className='h-6'>
                            <td className='pr-5'>Address:</td>
                            <td>{cwsDetail.data.address}, {cwsDetail.data.district}, {cwsDetail.data.province}</td>
                        </tr>
                        <tr className='h-8'>
                            <td className='pr-5'>Tel:</td>
                            <td>{cwsDetail.data.tel}</td>
                        </tr>
                        <tr className='h-8'>
                            <td className='pr-5'>Opening Time:</td>
                            <td>{cwsDetail.data.opentime}</td>
                        </tr>
                        <tr className='h-8'>
                            <td className='pr-5'>Closing Time:</td>
                            <td>{cwsDetail.data.closetime}</td>
                        </tr>
                    </table>
                </div>
                    
                    <Link href={`/reservation?id=${cwsDetail.data._id}`}>
                        <button className="font-medium bg-sky-500 hover:bg-slate-700 text-white py-2.5 px-5 rounded-full my-5">
                            Make Reservation
                        </button>
                    </Link>
                </div>
        </main>
    )
}
