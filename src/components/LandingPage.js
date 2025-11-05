import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo-container">
            <span className="logo-icon">🎓</span>
            <h1>ScholarTrack</h1>
          </div>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#scholarships" className="nav-link">Scholarships</a>
          <a href="#about" className="nav-link">About</a>
          <div className="nav-buttons">
            <button 
              className="nav-btn login-nav-btn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="nav-btn signup-nav-btn"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🚀 Your Future Starts Here</span>
            </div>
            <h1 className="hero-title">
              Your Path to 
              <span className="gradient-text"> Educational Success</span>
            </h1>
            <h2 className="hero-subtitle">
              Find & Track Scholarships That Matter
            </h2>
            <p className="hero-description">
              Discover thousands of scholarship opportunities, manage applications, 
              and never miss a deadline. Your educational journey begins with ScholarTrack.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary hero-btn"
                onClick={() => navigate('/signup')}
              >
                <span className="btn-content">
                  <span className="btn-text">Start Your Journey</span>
                  <span className="btn-icon">→</span>
                </span>
              </button>
              <button 
                className="btn btn-secondary hero-btn"
                onClick={() => navigate('/login')}
              >
                <span className="btn-content">
                  <span className="btn-text">Access Your Account</span>
                  <span className="btn-icon">🔐</span>
                </span>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">💰</div>
              <span>Scholarship Found</span>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">📚</div>
              <span>Application Sent</span>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🎯</div>
              <span>Success!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Scholarships</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💵</div>
              <div className="stat-number">$50M+</div>
              <div className="stat-label">Awarded</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Secure Your Future</h2>
            <p>Comprehensive tools designed to simplify your scholarship journey</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find scholarships that match your profile, interests, and academic background with our intelligent matching system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Deadline Tracking</h3>
              <p>Never miss an application deadline with automated reminders and calendar integration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Easy Applications</h3>
              <p>Apply to multiple scholarships with pre-filled information and real-time progress tracking.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Dashboard</h3>
              <p>Monitor your application status from submission to final decision all in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Future?</h2>
            <p>Join thousands of students who have already discovered their path to educational success with ScholarTrack.</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary cta-btn"
                onClick={() => navigate('/signup')}
              >
                <span className="btn-content">
                  <span className="btn-text">Create Free Account</span>
                  <span className="btn-icon">🎓</span>
                </span>
              </button>
              <button 
                className="btn btn-secondary cta-btn"
                onClick={() => navigate('/login')}
              >
                <span className="btn-content">
                  <span className="btn-text">Sign In Now</span>
                  <span className="btn-icon">🔑</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo-container">
                <span className="logo-icon">🎓</span>
                <h3>ScholarTrack</h3>
              </div>
              <p>Helping students achieve their dreams since 2024.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                <button onClick={() => navigate('/login')}>Student Login</button>
                <button onClick={() => navigate('/signup')}>Create Account</button>
                <button onClick={() => navigate('/login')}>Admin Login</button>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
                <a href="#careers">Careers</a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ScholarTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;