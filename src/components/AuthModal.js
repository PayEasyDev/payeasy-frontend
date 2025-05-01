import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function AuthModal({ initialMode, onClose, onSuccess }) {
    const [mode, setMode] = useState(initialMode);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setMode(initialMode);
        setError('');
    }, [initialMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (mode === 'signup') {
                const response = await axios.post('/api/signup', {
                    first_name: firstName,
                    surname,
                    email,
                    phone_number: phoneNumber,
                    password,
                });
                if (response.status === 200) {
                    onSuccess();
                    navigate('/user');
                }
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                if (data.user) {
                    onSuccess();
                    navigate('/user');
                }
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="auth-modal">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button">
                        {mode === 'signup' ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <div className="links">
                    <span
                        className="link"
                        onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                    >
                        {mode === 'signup' ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;