import { useEffect, useState } from "react";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10"
      );

      const result = await response.json();

      setProfiles(result.data.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Random Users Directory
      </h1>

    
      <div className="flex justify-center mb-8">
        <button
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Generate New Users
        </button>
      </div>

      
      {loading && (
        <h2 className="text-center text-xl font-semibold">
          Loading Users...
        </h2>
      )}

      
      {error && (
        <h2 className="text-center text-red-500 text-xl">
          {error}
        </h2>
      )}

  
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profiles.map((user) => (
            <div
              key={user.login.uuid}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
            >
              <img
                src={user.picture.large}
                alt="profile"
                className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
              />

              <h2 className="text-xl font-bold text-center mt-4">
                {user.name.first} {user.name.last}
              </h2>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {user.email}
                </p>

                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {user.phone}
                </p>

                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {user.gender}
                </p>

                <p>
                  <span className="font-semibold">Country:</span>{" "}
                  {user.location.country}
                </p>

                <p>
                  <span className="font-semibold">City:</span>{" "}
                  {user.location.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;