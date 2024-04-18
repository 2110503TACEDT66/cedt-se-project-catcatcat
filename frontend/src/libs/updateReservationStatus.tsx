export default async function updateReservationStatus(reservation: any, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/reservations/${reservation.id}`, {
        method: 'PUT',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            status: reservation.status
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}