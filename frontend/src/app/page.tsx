import Banner from '@/components/Banner';
import { VideoBanner } from "@/components/VideoBanner";
import PopUp from '@/components/PopUp';
import { getServerSession } from "next-auth"
import authOptions from '@/libs/auth/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="relative">
      <PopUp session={session} />
      <VideoBanner />
      <div className="overflow-auto">
        <Banner />
      </div>
    </main>
  );
}
