import { getServerSession } from "next-auth"
import authOptions from '@/libs/auth/authOptions';
import SpecialPrivileges from "@/components/SpecialPrivileges";
import TopMenuPreium from "@/components/TopMenuPremium";

export default async function PremiumPage() {

    const session = await getServerSession(authOptions)

    if (!session) return null

    return(
        <main>
            <TopMenuPreium/>
            <SpecialPrivileges/>
        </main>
    )
}