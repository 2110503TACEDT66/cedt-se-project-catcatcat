import getPremiumTransactions from "@/libs/getPremiumTransactions";
import { getServerSession } from "next-auth"
import authOptions from '@/libs/auth/authOptions';
import MyPremium from "@/components/MyPremium";

export default async function MyPremiumPage() {

    const session = await getServerSession(authOptions)

    if (!session) return null

    const premiumTransactions = await getPremiumTransactions(session.user.token)
    
    return(
        <main>
            <MyPremium premiumTransactions={premiumTransactions} user={session.user}/>
        </main>
    )
}
