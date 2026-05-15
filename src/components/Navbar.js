import {Link, useLocation} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar=()=> {
    let location = useLocation();
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsOpen(false);
        navigate('/login');
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const isAuthenticated = localStorage.getItem('token');

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo/Brand */}
                <Link to="/" className="navbar-brand" onClick={() => setIsOpen(false)}>
                    <span className="brand-text">BlogPlatform</span>
                </Link>

                {/* Hamburger Menu */}
                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`hamburger-line ${isOpen ? 'active' : ''}`}></span>
                    <span className={`hamburger-line ${isOpen ? 'active' : ''}`}></span>
                    <span className={`hamburger-line ${isOpen ? 'active' : ''}`}></span>
                </button>

                {/* Navigation Menu */}
                <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link 
                                to="/" 
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                    </ul>

                    {/* Auth Buttons */}
                    <div className="auth-buttons">
                        {!isAuthenticated ? (
                            <>
                                <Link 
                                    className='btn btn-primary' 
                                    to='/login' 
                                    role="button"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    className='btn btn-primary' 
                                    to='/signup' 
                                    role="button"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <button 
                                className='btn btn-primary'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )} 
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
