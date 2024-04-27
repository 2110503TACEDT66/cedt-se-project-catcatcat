import authOptions from "@/libs/auth/authOptions";
import getPremiumTransactions from "@/libs/getPremiumTransactions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import ViewPremium from "@/components/ViewPremium"

export default async function ViewPremiumPage({params}: {params: {id: string}}){
    const session = await getServerSession(authOptions)

    if(!session) return null

    const user = await getUserProfile(session.user.token)
    const premiumTransaction = await getPremiumTransactions(session.user.token)

    return (
        <main>
            <ViewPremium user={user.data} premiumTransaction={premiumTransaction?.data}></ViewPremium>
        </main>
    )
}