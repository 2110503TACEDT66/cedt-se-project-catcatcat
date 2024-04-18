'use client'

import { useSession, signOut } from 'next-auth/react';
import { useState, useRef } from 'react';
import editUser from '@/libs/editUser';
import { useRouter } from 'next/navigation';
import deleteUserFunction from '@/libs/deleteUser';

export default function ReservationMenu() {

    const {data: session} = useSession()

    if (!session || !session.user.token) {
        return null
    }

    const router = useRouter()

    const [username, setUsername] = useState<string>(session.user.name)
    const [email, setEmail] = useState<string>(session.user.email)
    const [tel, setTel] = useState<string>(session.user.tel)
    const [password, setPassword] = useState<string|null>(null)
    const [confirmPassword, setConfirmPassword] = useState<string|null>(null)
    const [status, setStatus] = useState<string|null>(null)

    const updateUser = () => {
        setStatus(null)

        if (username === session.user.name && email === session.user.email && tel === session.user.tel && !password) {
            return
        }

        let user: any = {}
        
        if (username !== session.user.name) user.name = username
        if (email !== session.user.email) user.email = email
        if (tel !== session.user.tel) user.tel = tel
        if (password) {
            if (password === confirmPassword) user.password = password
            else {
                setStatus('Password does not match')
                return
            }
        }

        editUser(user, session.user.token)
            .then(() => {
                signOut()
                router.push('/api/auth/signin')
            })
            .catch(err => {
                setStatus(err.message)
            })
    }

    const popupScreen = useRef<HTMLDivElement>(null)

    const deleteUser = () => {
        deleteUserFunction(session.user.token)
            .then(() => {
                signOut()
                router.push('/')
            })
            .catch(err => {
                if (popupScreen.current) popupScreen.current.classList.toggle('hidden')
                setStatus(err.message)
            })
    }

    return(
        <div className='w-[300px] h-fit bg-amber-50 rounded-lg border border-2 border-slate-700 p-[15px]'>
            <div className="text-xl font-bold font-serif text-center my-4 text-slate-700">Account Info</div>
            <div className="grid gap-4 mb-6 md:grid-rows-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input type="text" id="first_name" placeholder='Enter new username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={session.user.name} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="text" id="email" placeholder='Enter new email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={session.user.email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
                    <input type="tel" id="phone" placeholder='Enter new phone number' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={session.user.tel} onChange={(e) => setTel(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input type="password" id="password" placeholder='Enter new password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setPassword(e.target.value)} />
                </div> 
                <div>
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                    <input type="password" id="confirm_password" placeholder='Comfirm the password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div> 
                {
                    (session.user.role === "admin") ?
                    <div>
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                        <input type="text" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={session.user.role} readOnly/>
                    </div> : null
                }
                <button className="text-green-700 hover:text-white bg-white hover:bg-green-700 border border-1 border-green-700 font-medium rounded-full text-sm py-2.5 text-center" onClick={updateUser}>Save Change</button>
                <button className="text-red-800 hover:text-white bg-white hover:bg-red-800 border border-1 border-red-800 font-medium rounded-full text-sm py-2.5 text-center" onClick={(e) => {if (popupScreen.current) popupScreen.current.classList.toggle('hidden')}}>Delete Account</button>

                {
                    status? <div className='text-sm text-red-700 text-center'> {status} </div> : null
                }
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden" ref={popupScreen}>
                <div className="bg-white p-8 rounded-lg shadow-md mx-4">
                    <div className="text-2xl font-bold mb-4">Are you sure to delete account</div>
                    <div>All of your data will be lose.</div>
                    <div className='space-x-4 flex justify-end'>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={(e) => {if (popupScreen.current) popupScreen.current.classList.toggle('hidden')}}>
                        Close
                        </button>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={deleteUser}>
                        Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



