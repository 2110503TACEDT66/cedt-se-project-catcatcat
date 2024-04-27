import View from "@/components/View";
import authOptions from "@/libs/auth/authOptions";
import getReservation from "@/libs/getReservation";
import getTransaction from "@/libs/getTransaction";
import { getServerSession } from "next-auth";

export default async function ViewPage({params} : {params: {id: string}}){

    const session = await getServerSession(authOptions)

    if (!session) return null

    const reservation = await getReservation(session.user.token, params.id)
    const transaction = await getTransaction(reservation.data._id, session.user.token)

    return (
        <main>
            <View reservation={reservation.data} transaction={transaction?.data}></View>
        </main>
    )
}