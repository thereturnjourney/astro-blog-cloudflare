const TRJ_API_URL = import.meta.env.PUBLIC_TRJ_API_URL

export async function fetchFeaturedBlogs() {
    try {
    	const response = await fetch(`${TRJ_API_URL}/getFeaturedBlogs`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function fetchAllBlogs() {
    try {
    	const response = await fetch(`${TRJ_API_URL}/getallBlogs`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function fetchBlogDetail(id) {
    try {
    	const response = await fetch(`${TRJ_API_URL}/getBlog/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}