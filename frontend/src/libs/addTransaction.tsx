export default async function addTransaction(transaction: TransactionItem, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/transactions/`, {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reservation: transaction.reservation,
            user: transaction.user,
            totalcost: transaction.totalcost,
            bank: transaction.bank,
            slip: transaction.slip
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}