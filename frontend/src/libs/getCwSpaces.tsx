export default async function getCwSpaces() {
    const response = await fetch(`https://coworking-backend-beta.vercel.app/api/coworkingspaces`, {next:{tags:['cwSpaces']}});
    
    if (!response.ok) {
        throw new Error('Failed to fetch coworking spaces');
    }

    return await response.json();
}