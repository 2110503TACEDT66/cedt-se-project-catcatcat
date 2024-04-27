export default async function deletePremiumTransaction(id: string, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/premiumtransactions/${id}`, {
        method: 'DELETE',
        headers: {
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error("Cannot delete Premium Transaction")

    return await response.json();
}