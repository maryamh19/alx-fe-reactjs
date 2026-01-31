import axios from "axios";

const API_URL = import.meta.env.VITE_GITHUB_API_URL;
const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export const searchUsers = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/search/users`, {
      params: { q: username },
      headers: API_KEY
        ? { Authorization: `token ${API_KEY}` }
        : {},
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    throw error;
  }
};
