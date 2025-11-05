// src/components/Navbar.js (Updated)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.navLogo}>
          # ScholarTrack
        </Link>
        
        <div style={styles.navMenu}>
          <Link to="/scholarships" style={styles.navLink}>Scholarships</Link>
          
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" style={styles.navLink}>Admin Dashboard</Link>
              ) : (
                <Link to="/my-applications" style={styles.navLink}>My Applications</Link>
              )}
              <span style={styles.navUser}>
                Hello, {user.name} {user.role === 'admin' && '(Admin)'}
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/signup" style={styles.signupBtn}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navLogo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2563eb',
    textDecoration: 'none'
  },
  navMenu: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease'
  },
  navUser: {
    color: '#6b7280',
    fontSize: '0.875rem'
  },
  signupBtn: {
    background: '#2563eb',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500'
  },
  logoutBtn: {
    background: '#ef4444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500'
  }
};

export default Navbar;