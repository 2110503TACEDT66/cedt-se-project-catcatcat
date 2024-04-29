export default async function updateUser(user: any, token: string) {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            role: user.role,
            expire: user.expire
        })
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}