// import { apiEndpoint } from "./api";

// const apiEndpoint = process.env.API_URL

const apiEndpoint = 'https://dev-api.thereturnjourney.com/'

export async function fetchFeaturedBlogs() {
    try {
    	const response = await fetch(`${apiEndpoint}getFeaturedBlogs`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function fetchAllBlogs() {
    try {
    	const response = await fetch(`${apiEndpoint}getallBlogs`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function fetchBlogDetail(id) {
    try {
    	const response = await fetch(`${apiEndpoint}getBlog/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}