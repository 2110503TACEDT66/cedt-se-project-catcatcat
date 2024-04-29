import authOptions from "@/libs/auth/authOptions";
import { getServerSession } from "next-auth";
import ViewPremium from "@/components/ViewPremium"
import getPremiumTransactions from "@/libs/getPremiumTransactions";
import getPremiumTransaction from "@/libs/getPremiumTransaction";

export default async function ViewPremiumPage({params}: {params: {id: string}}){
    const session = await getServerSession(authOptions)

    if(!session) return null

    // const premiumTransactions = await getPremiumTransactions(session.user.token)
    const premiumTransaction = await getPremiumTransaction(session.user.token, params.id)

    return (
        <main>
            <ViewPremium user={session.user} premiumTransaction={premiumTransaction?.data}></ViewPremium>
        </main>
    )
}