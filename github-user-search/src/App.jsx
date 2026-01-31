import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <p>Search for GitHub profiles using the GitHub API</p>

      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default App;
