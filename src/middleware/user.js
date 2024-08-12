// import { apiEndpoint } from "./api";

// const apiEndpoint = process.env.API_URL


const apiEndpoint = 'https://dev-api.thereturnjourney.com/'

export async function fetchUserInfo(tokenID) {
    console.log('process: ', process.env)

    try {
        const response = await fetch(`${apiEndpoint}users/me`, {
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
