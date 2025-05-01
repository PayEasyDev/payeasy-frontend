function Navbar({ onLoginClick, onSignupClick }) {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>PayEasy</h2>
            </div>
            <div className="navbar-links">
                <span className="nav-link" onClick={onLoginClick}>
                    Login
                </span>
                <span className="nav-link" onClick={onSignupClick}>
                    Signup
                </span>
            </div>
        </nav>
    );
}

export default Navbar;