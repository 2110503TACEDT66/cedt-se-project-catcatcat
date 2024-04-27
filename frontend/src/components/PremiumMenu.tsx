'use client'

import Link from "next/link"

export default function PremiumMenu() {

    return(
        <div className="flex flex-row justify-center items-center rounded-lg bg-[#EEBF79] py-4 px-4 rounded-lg w-[100%] mx-16 mb-20">
          <div className = "flex flex-col items-center">
            <div className="text-center w-80 mx-4 px-4 py-1 font-medium text-3xl">
                special privileges</div>
            <Link href={`/premium`}>
                <button className="items-center w-60 mx-4 my-2 px-4 py-2 bg-[#212E51] text-lg font-small text-white">More Description</button>
            </Link>
          </div>
          <div className="rounded-lg items-center w-52 mx-5 px-4 py-8 bg-white text-lg font-small text-yellow-600 text-center">
            discount
          </div>
            <div className="rounded-lg items-center w-52 mx-5 px-4 py-8 bg-white text-lg font-small text-yellow-600 text-center">
            more reserve
          </div>
            <div className="rounded-lg items-center w-52 mx-5 px-4 py-8 bg-white text-lg font-small text-yellow-600 text-center">
            special privileges
          </div>
        </div>
    )
}



