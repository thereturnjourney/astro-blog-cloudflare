import { apiEndpoint } from "./api";

export async function fetchUserInfo(tokenID) {
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
