// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.home}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Your Path to Educational Success</h1>
          <h2 style={styles.heroSubtitle}>Find & Track Scholarships That Matter</h2>
          <p style={styles.heroText}>
            Discover thousands of scholarship opportunities, manage applications, 
            and never miss a deadline. Your future starts here.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/signup" style={styles.primaryBtn}>Get Started →</Link>
            <Link to="/scholarships" style={styles.secondaryBtn}>Browse Scholarships</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  home: {
    minHeight: 'calc(100vh - 80px)'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '100px 20px',
    textAlign: 'center'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: '700'
  },
  heroSubtitle: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    fontWeight: '600'
  },
  heroText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: '0.9',
    lineHeight: '1.6'
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryBtn: {
    background: '#ffffff',
    color: '#2563eb',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  secondaryBtn: {
    background: 'transparent',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    border: '2px solid white',
    transition: 'all 0.3s ease'
  }
};

export default Home;