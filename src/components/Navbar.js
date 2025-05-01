function Navbar({ onLoginClick, onSignupClick }) {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>PayEasy</h2>
            </div>
            <div className="navbar-links">
                <span className="nav-link" onClick={() => alert('Feature coming soon')}>
                    How It Works
                </span>
                <span className="nav-link" onClick={() => alert('Feature coming soon')}>
                    Safety Education
                </span>
                <span className="nav-link" onClick={() => alert('Feature coming soon')}>
                    FAQ
                </span>
                <span className="nav-link" onClick={onLoginClick}>
                    Login
                </span>
            </div>
        </nav>
    );
}

export default Navbar;