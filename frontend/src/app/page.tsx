import Banner from '@/components/Banner';
import { VideoBanner } from "@/components/VideoBanner";

export default function Home() {
  return (
    <main>
      <VideoBanner />
      <div className="overflow-auto">
        <Banner />
      </div>
    </main>
  );
}