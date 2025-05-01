import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function UserPage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                setError('You must be logged in to view this page.');
                setTimeout(() => navigate('/'), 2000);
                return;
            }

            if (!user.confirmed_at) {
                setError('Please verify your email to access this page.');
                setTimeout(() => navigate('/'), 2000);
                return;
            }

            setUserData({
                display_name: user.user_metadata.display_name || 'Not set',
                email: user.email,
                phone_number: user.user_metadata.phone_number || 'Not set',
            });
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-page">
            <h2>Welcome, {userData.display_name}!</h2>
            <div className="user-details">
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone Number:</strong> {userData.phone_number}</p>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default UserPage;