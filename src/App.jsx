import { useEffect, useState } from "react";
import { initLiff, getProfile } from "./liff/liff";

function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startLiff = async () => {
      try {
        await initLiff();
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (err) {
        console.error(err);
        setError("Cannot init LIFF");
      } finally {
        setLoading(false);
      }
    };

    startLiff();
  }, []);

  const handleLogout = () => {
    if (liff.isLoggedIn()) {
      liff.logout();
      window.location.reload();
    }
  };

  if (loading) return <div>Loading LIFF...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h1>React + LINE LIFF</h1>

      {profile ? (
        <>
          <img
            src={profile.pictureUrl}
            alt="profile"
            style={{ width: 80, borderRadius: "50%" }}
          />
          <h2>{profile.displayName}</h2>
          <p>UserID: {profile.userId}</p>
          {profile.statusMessage && <p>{profile.statusMessage}</p>}

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No profile (not logged in?)</p>
      )}
    </div>
  );
}

export default App;
