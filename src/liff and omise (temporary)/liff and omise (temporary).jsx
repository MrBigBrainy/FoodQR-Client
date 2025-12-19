import { useEffect, useState } from "react";
import { initLiff, getProfile } from "./liff/liff";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios"

function App() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY)

    const createSource = () => {
        return new Promise((resolve, reject) => {
            // ทำการส่ง source ที่ต้องการจ่ายไป omise เพื่อนำ source token กลับมา
            Omise.createSource('promptpay', {
                amount: (100 * 100),
                currency: 'THB'
            }, (statusCode, response) => {
                if (statusCode !== 200) {
                    return reject(response)
                }
                resolve(response)
            })
        })
    }

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
            <h1>Omise Response</h1>
            <button onClick={async () => {
                const omiseResponse = await createSource()

                const response = await axios.post('https://foodqr-server.onrender.com/api/omise', {
                    source: omiseResponse.id
                })
                //  const response = await axios.post('http://localhost:3000/api/omise', {
                //     source: omiseResponse.id
                // })
                console.log(response)

            }}>Test Omise Response</button>
            <h1>Scan MY QR Code</h1>
            <QRCodeSVG value={'https://liff.line.me/2008556874-G43oa4Nq'} size={256} />
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
