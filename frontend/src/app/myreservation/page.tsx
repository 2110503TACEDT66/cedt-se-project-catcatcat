import MyReservation from "@/components/MyReservation"
import getReservations from "@/libs/getReservations"
import { getServerSession } from "next-auth"
import authOptions from '@/libs/auth/authOptions';

export default async function MyReservationPage() {

    const session = await getServerSession(authOptions)

    if (!session) return null

    const reservations = await getReservations(session.user.token)

    return(
        <main>
            <MyReservation reservations={reservations} user={session.user}/>
        </main>
    )
}