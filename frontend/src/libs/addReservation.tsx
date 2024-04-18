export default async function addReservation(reservationItem: ReservationItem, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/coworkingspaces/${reservationItem.cwsID}/reservations`, {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reserveStartTime: reservationItem.startTime,
            reserveEndTime: reservationItem.endTime,
            totalcost: reservationItem.totalcost
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}