export default async function deleteCurrentUser(id: string, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/users`, {
        method: 'DELETE',
        headers: {
            "authorization": `Bearer ${token}`
        }
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}