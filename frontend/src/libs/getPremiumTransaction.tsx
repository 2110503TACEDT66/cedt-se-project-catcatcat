export default async function getPremiumTransaction(token: string, id:string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/premiumtransactions/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error(`Cannot get ${id} Premium Transactions`)

    return await response.json();
}