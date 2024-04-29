export default async function deleteUser(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })

    const json = await response.json()

    if (!response.ok) throw new Error(json.message)

    return json
}