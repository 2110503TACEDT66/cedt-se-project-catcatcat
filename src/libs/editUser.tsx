export default async function editUser(user: Object, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/users`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}