import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchAdvancedUsers = async (username, location, minRepos, page = 1) => {
  try {
    // Construct the query string for GitHub Search API
    let query = username || "";
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    // GitHub Search API endpoint
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: 10,
      },
      headers: {
        Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
          ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
          : undefined,
      },
    });

    // Optional: fetch extra details for each user
    const detailedUsers = await Promise.all(
      response.data.items.map(async (user) => {
        const details = await axios.get(`${BASE_URL}/users/${user.login}`, {
          headers: {
            Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
              ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
              : undefined,
          },
        });
        return { ...user, ...details.data };
      })
    );

    return { ...response.data, items: detailedUsers };
  } catch (error) {
    throw error;
  }
};
