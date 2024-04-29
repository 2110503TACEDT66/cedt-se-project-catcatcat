import authOptions from "@/libs/auth/authOptions";
import { getServerSession } from "next-auth";
import ViewPremium from "@/components/ViewPremium"
import getPremiumTransaction from "@/libs/getPremiumTransaction";

export default async function ViewPremiumPage({params}: {params: {id: string}}){
    const session = await getServerSession(authOptions)

    if(!session) return null

    const premiumTransaction = await getPremiumTransaction(session.user.token, params.id)
    return (
        <main>
            <ViewPremium premiumTransaction={premiumTransaction?.data}></ViewPremium>
        </main>
    )
}