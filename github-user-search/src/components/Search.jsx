import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      const data = await fetchAdvancedUsers(username, location, minRepos, 1);
      setUsers(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError("No users found matching the criteria");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data = await fetchAdvancedUsers(username, location, minRepos, nextPage);
      setUsers([...users, ...data.items]);
      setPage(nextPage);
    } catch (err) {
      setError("Error loading more users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form className="flex flex-col gap-3" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Repos"
          className="border p-2 rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow hover:shadow-lg">
            <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full mx-auto" />
            <h2 className="text-center font-bold mt-2">{user.login}</h2>
            {user.location && <p className="text-center text-gray-600">{user.location}</p>}
            <p className="text-center text-gray-500">Repos: {user.public_repos ?? "N/A"}</p>
            <a
              href={user.html_url}
              target="_blank"
              className="block mt-2 text-center text-blue-500 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {users.length < totalCount && !loading && (
        <button
          onClick={loadMore}
          className="mt-4 bg-gray-200 p-2 rounded hover:bg-gray-300 block mx-auto"
        >
          Load More
        </button>
      )}
    </div>
  );
}
