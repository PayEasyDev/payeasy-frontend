import { useState } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('login');

    const openModal = (mode) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    return (
        <div className="app">
            <Navbar
                onLoginClick={() => openModal('login')}
                onSignupClick={() => openModal('signup')}
            />
            <div className="landing-container">
                <h1>Welcome to PayEasy</h1>
                <p>Send money to friends and family instantly in South Africa.</p>
                <button className="primary-button" onClick={() => openModal('signup')}>
                    Get Started
                </button>
            </div>
            {isModalOpen && <AuthModal initialMode={modalMode} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default App;