import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/celebrity?name=${search}`,
        {
          headers: {
            "X-Api-Key": "INSERT YOUR API KEY", // here introduce your API key from API Ninja
          },
        }
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length > 0) {
        fetchData();
      }
    }, 2000);

    return () => clearTimeout(timer); // eslint-disable-next-line
  }, [search]);

  return (
    <div className="App">
      <form>
        <label>Search for a celebrity: </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {error && <p>An error appeared. Try again later...</p>}
      {isLoading ? (
        <p>One moment please...</p>
      ) : (
        searchResults.map((item) => {
          return (
            <div key={item.id}>
              <h2>Name: {item.name}</h2>
              <h3>Nationality: {item.nationality}</h3>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
