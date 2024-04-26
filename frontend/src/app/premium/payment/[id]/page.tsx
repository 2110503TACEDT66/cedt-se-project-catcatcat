import PremiumPayment from "@/components/PremiumPayment"

export default async function PaymentDetailPage({params} : {params: {id : string}}){
    return (
        <main>
            <PremiumPayment plan={params.id}/>
        </main>
    )
}