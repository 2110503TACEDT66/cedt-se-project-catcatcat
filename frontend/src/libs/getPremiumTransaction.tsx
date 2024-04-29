export default async function getPremiumTransaction(token: string, id:string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/premiumtransactions/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error(`Cannot get ${id} Premium Transactions`)

    return await response.json();
}