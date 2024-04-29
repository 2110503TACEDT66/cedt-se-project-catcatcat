import Banner from '@/components/Banner';
import { VideoBanner } from "@/components/VideoBanner";
import PopUp from '@/components/PopUp';
import { getServerSession } from "next-auth"
import authOptions from '@/libs/auth/authOptions';
import getUserProfile from '@/libs/getUserProfile';

export default async function Home() {

  const session = await getServerSession(authOptions)
  let user
  if (session) {
    user = await getUserProfile(session?.user.token)
  }

  return (
    <main className="relative">
      <PopUp user={user} />
      <VideoBanner />
      <div className="overflow-auto">
        <Banner/>
      </div>
    </main>
  );
}
