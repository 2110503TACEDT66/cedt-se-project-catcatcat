export default async function addPremiumTransaction(premiumtransaction: PremiumTransactionItem, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/premiumtransactions/`, {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            membership: premiumtransaction.membership,
            cost: premiumtransaction.cost,
            bank: premiumtransaction.bank,
            studentcard:premiumtransaction.studentcard,
            slip: premiumtransaction.slip
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}