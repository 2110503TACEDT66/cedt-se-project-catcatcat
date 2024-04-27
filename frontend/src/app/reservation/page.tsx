import CwsSelector from "@/components/CwsSelector";
import getCwSpaces from "@/libs/getCwSpaces";
import ReservationMenu from "@/components/ReservationMenu";

export default async function Reservation() {

    const cws = await getCwSpaces()

    return (
        <main className="w-[100%] flex flex-col md:flex-row items-center justify-around md:justify-start space-y-4 md:space-y-0 m-0 md:mx-6 my-[20px]">
            <ReservationMenu />
            <div className="flex flex-col items-center space-y-4 w-screen">
                <div className="text-3xl font-bold font-serif text-center">Make Reservation</div>
                <CwsSelector cws={cws}/>
            </div>
        </main>
    )
}