export default async function updatePremiumStatus(premiumTransaction: any, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/premiumtransactions/${premiumTransaction.id}`, {
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