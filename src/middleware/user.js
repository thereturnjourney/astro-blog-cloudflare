const TRJ_API_URL = import.meta.env.PUBLIC_TRJ_API_URL

// Assuming `API_URL` is an environment variable defined in Cloudflare Workers or your Astro project
export async function fetchUserInfo(tokenID, env) {
    // Dynamically set the API endpoint from the environment variable
    // const apiEndpoint = env.API_URL || 'https://api.thereturnjourney.com/'; // Default to the dev API if not set
    try {
        const response = await fetch(`${TRJ_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${tokenID}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        return null;
    }
}

