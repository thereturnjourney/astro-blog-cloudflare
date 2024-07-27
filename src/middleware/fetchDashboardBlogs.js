import { apiEndpoint } from "./api";

export async function fetchDashboardBlogs() {
    try {
      const response = await fetch(`${apiEndpoint}getdashBoardBlogs`);
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }