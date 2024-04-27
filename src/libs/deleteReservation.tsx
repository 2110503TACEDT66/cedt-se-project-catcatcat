export default async function deleteReservation(id: string, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error("Cannot delete reservation")

    return await response.json();
}