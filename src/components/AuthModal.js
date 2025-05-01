import { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_KEY
);

function AuthModal({ initialMode, onClose }) {
    const [mode, setMode] = useState(initialMode || 'login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setMode(initialMode || 'login');
    }, [initialMode]);

    const handleSubmit = async () => {
        setError('');
        try {
            if (mode === 'signup') {
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                    email,
                    password,
                    username,
                    phone_number: phoneNumber,
                });
                alert('Signup successful! Please check your email for confirmation.');
                setMode('login');
            } else {
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                    email,
                    password,
                });
                await supabase.auth.setSession({ access_token: data.token });
                alert('Login successful!');
                onClose();
            }
            setEmail('');
            setPassword('');
            setUsername('');
            setPhoneNumber('');
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="auth-modal">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{mode === 'login' ? 'Log In' : 'Sign Up'}</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    placeholder="Username or email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {mode === 'signup' && (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </>
                )}
                {mode === 'login' && (
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                    </label>
                )}
                <button className="submit-button" onClick={handleSubmit}>
                    {mode === 'login' ? 'Log In' : 'Sign Up'}
                </button>
                <div className="links">
                    <span
                        className="link"
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    >
                        {mode === 'login' ? 'Register now' : 'Already have an account? Log in'}
                    </span>
                    {mode === 'login' && (
                        <span className="link" onClick={() => alert('Feature coming soon')}>
                            Forget password?
                        </span>
                    )}
                </div>
                <div className="separator">or</div>
                <button className="social-button facebook" onClick={() => alert('Feature coming soon')}>
                    Log in with Facebook
                </button>
                <button className="social-button twitter" onClick={() => alert('Feature coming soon')}>
                    Log in with Twitter
                </button>
                <button className="social-button google" onClick={() => alert('Feature coming soon')}>
                    Log in with Google
                </button>
            </div>
        </div>
    );
}

export default AuthModal;