import { useState } from "react";
import { fetchUserData } from "../services/githubService";

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
      const data = await fetchUserData(username, location, minRepos, 1);

      if (!data.items || data.items.length === 0) {
        setError("Looks like we cant find the user");
        setUsers([]);
        return;
      }

      setUsers(data.items);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const data = await fetchUserData(username, location, minRepos, nextPage);
      setUsers((prev) => [...prev, ...(data.items || [])]);
      setPage(nextPage);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded flex-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded flex-1"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Minimum Repos"
          className="border p-2 rounded w-full md:w-40"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-gray-400">
          No results yet. Try searching!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded shadow p-4 flex flex-col items-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              loading="lazy"
              className="w-24 h-24 rounded-full mb-2"
            />

            <h2 className="font-bold text-lg">
              {user.name || user.login}
            </h2>

            {user.location && (
              <p className="text-gray-600">{user.location}</p>
            )}

            <p className="text-gray-500">
              Repos: {user.public_repos ?? "N/A"}
            </p>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-blue-500 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {users.length < totalCount && !loading && (
        <button
          onClick={loadMore}
          className="mt-6 block mx-auto bg-gray-200 p-2 rounded hover:bg-gray-300"
        >
          Load More
        </button>
      )}
    </div>
  );
}
