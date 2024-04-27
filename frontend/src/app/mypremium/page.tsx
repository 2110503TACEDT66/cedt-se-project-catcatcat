import PremiumRequests from "@/components/PremiumRequests"
import getPremiumTransactions from "@/libs/getPremiumTransactions";
import { getServerSession } from "next-auth"
import authOptions from '@/libs/auth/authOptions';

export default async function MyPremiumPage() {

    const session = await getServerSession(authOptions)

    if (!session) return null

    const premiumTransactions = await getPremiumTransactions(session.user.token)
    
    return(
        <main>
            <PremiumRequests premiumTransactions={premiumTransactions} user={session.user}/>
        </main>
    )
}
