export default async function updatePremiumStatus(premiumTransaction: any, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/premiumtransactions/${premiumTransaction.id}`, {
        method: 'PUT',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            status: premiumTransaction.status
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}