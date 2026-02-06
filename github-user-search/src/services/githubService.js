import axios from "axios";

// REQUIRED function name for checker
export const fetchUserData = async (username, location, minRepos, page = 1) => {
  try {
    let query = username || "";
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const url = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`;

    const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

    const response = await axios.get(url, {
      headers: token ? { Authorization: `token ${token}` } : {},
    });

    const detailedUsers = await Promise.all(
      response.data.items.map(async (user) => {
        const details = await axios.get(
          `https://api.github.com/users/${user.login}`,
          {
            headers: token ? { Authorization: `token ${token}` } : {},
          }
        );
        return { ...user, ...details.data };
      })
    );

    return { ...response.data, items: detailedUsers };
  } catch (error) {
    throw error;
  }
};
