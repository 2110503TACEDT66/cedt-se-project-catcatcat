import PaymentReservation from "@/components/PaymentReservation";
import authOptions from "@/libs/auth/authOptions";
import getReservation from "@/libs/getReservation";
import { getServerSession } from "next-auth";

export default async function PaymentPage({params} : {params: {id: string}}){

    const session = await getServerSession(authOptions)

    if (!session) return null

    const reservation = await getReservation(session.user.token, params.id)

    return (
        <main>
            <PaymentReservation reservation={reservation.data}/>
        </main>
    )
}