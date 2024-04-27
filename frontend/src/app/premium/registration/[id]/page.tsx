import PremiumRegister from "@/components/PremiumRegister"
export default function Registerpage({params} : {params: {id: string}}) {
    return (
        <main>
            <PremiumRegister plan={params.id}/>
        </main>
    )
}