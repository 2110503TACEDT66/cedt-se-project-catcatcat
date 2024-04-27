'use client'

import { useState } from 'react';
import styles from './topmenu.module.css';
import TopMenuItem from './TopMenuItem';
import { Link } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function TopMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };
    const {data: session} = useSession()

    return (
        <div className='h-[60px] fixed top-0 right-0 left-0 z-30 flex flex-row bg-regal-blue'>
            <div className='mx-3 my-auto'>
                <Link href={'/'}>
                    <svg className="w-10 h-10 text-sky-500 dark:text-sky-500" aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                    </svg>
                </Link>
            </div>
            {
                session ?
                <div className={styles.namecontainer}>Hello, {session.user?.name}</div> : null
            }
            <TopMenuItem title='My Reservations' pageRef='/myreservation'/>
            {
                    (session?.user.role === "admin") ?
                    <TopMenuItem title='Premium Requests' pageRef='/premiumrequests'/>
                    : null
            }
            <div className='flex md:hidden absolute right-0 h-full mx-3 mt-1' onClick={handleMenuToggle}>
                <svg className="w-10 h-10 text-sky-500 dark:text-sky-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="M5 7h14M5 12h14M5 17h14"/>
                </svg>
            </div>
            {
                showMenu ?
                <div className='flex md:hidden flex-col absolute right-0 bg-slate-700 space-y-3 mt-11 p-5 rounded-md' onClick={handleMenuToggle}>
                    {
                        session ? 
                        <Link href="/api/auth/signout">
                            <div className='flex items-center h-full mr-5 text-sky-500 text-sm font-semibold'>Sign-Out</div>
                        </Link> :
                        <div className='flex flex-col space-y-3'>
                            <Link href="/register">
                                <div className='flex items-center h-full mr-5 text-sky-500 text-sm font-semibold'>Sign-Up</div>
                            </Link>
                            <Link href="/api/auth/signin">
                                <div className='flex items-center h-full mr-5 text-sky-500 text-sm font-semibold'>Sign-In</div>
                            </Link>
                        </div>
                    }
                    <TopMenuItem title='Co-working Spaces' pageRef='/coworkingspace'/>
                    <TopMenuItem title='Make Reservation' pageRef='/reservation'/>
                </div> : null
            }
            <div className='hidden md:flex flex-row absolute right-0 h-full'>

                <TopMenuItem title='Co-working Spaces' pageRef='/coworkingspace'/>
                <TopMenuItem title='Make Reservation' pageRef='/reservation'/>
                {
                    session ? 
                    <Link href="/api/auth/signout">
                        <div className='flex items-center h-full mr-5 text-sky-500 text-sm font-semibold'>Sign-Out</div>
                    </Link> :
                    <div className='flex flex-row'>
                        <Link href="/api/auth/signin">
                            <div className='flex items-center h-full mr-5 text-sky-500 text-sm font-semibold'>Sign-In</div>
                        </Link>
                        <Link href="/register">
                            <div className='flex items-center h-full mr-5 text-sky-500 text-sm font-semibold'>Sign-Up</div>
                        </Link>
                    </div>
                }
            </div>

            
        </div>
    );
}