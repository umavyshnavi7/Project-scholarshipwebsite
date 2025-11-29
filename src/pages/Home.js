// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const stats = [
    { number: '10,000+', label: 'Scholarships Available', icon: '🎓' },
    { number: '$50M+', label: 'Awarded This Year', icon: '💰' },
    { number: '25,000+', label: 'Students Helped', icon: '👥' },
    { number: '95%', label: 'Success Rate', icon: '📈' }
  ];
  
  const features = [
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'AI-powered matching to find scholarships that fit your profile perfectly'
    },
    {
      icon: '📅',
      title: 'Deadline Tracking',
      description: 'Never miss an opportunity with our intelligent reminder system'
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description: 'Track your applications and optimize your success rate'
    },
    {
      icon: '🤝',
      title: 'Expert Support',
      description: 'Get guidance from our team of scholarship experts'
    }
  ];
  
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [stats.length]);
  
  return (
    <div style={styles.home}>
      <section style={styles.hero}>
        <div style={{...styles.heroContent, ...(isVisible ? styles.fadeIn : {})}}>
          <h1 style={styles.heroTitle}>Your Path to Educational Success</h1>
          <h2 style={styles.heroSubtitle}>Find & Track Scholarships That Matter</h2>
          <p style={styles.heroText}>
            Discover thousands of scholarship opportunities, manage applications, 
            and never miss a deadline. Your future starts here.
          </p>
          
          {/* Dynamic Stats Display */}
          <div style={styles.statsDisplay}>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>{stats[currentStat].icon}</span>
              <span style={styles.statNumber}>{stats[currentStat].number}</span>
              <span style={styles.statLabel}>{stats[currentStat].label}</span>
            </div>
          </div>
          
          <div style={styles.heroButtons}>
            <Link to="/signup" style={styles.primaryBtn} className="pulse-btn">
              Get Started → 
            </Link>
            <Link to="/scholarships" style={styles.secondaryBtn}>
              Browse Scholarships
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Why Choose Our Platform?</h2>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} style={{...styles.featureCard, animationDelay: `${index * 0.2}s`}}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p style={styles.ctaText}>Join thousands of students who have found their perfect scholarships</p>
          <Link to="/signup" style={styles.ctaButton}>
            Start Now - It's Free!
          </Link>
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
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.8s ease'
  },
  fadeIn: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #fff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
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
  statsDisplay: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '20px',
    margin: '2rem 0',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  statIcon: {
    fontSize: '2rem'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #fff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  statLabel: {
    fontSize: '1rem',
    opacity: 0.9
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  primaryBtn: {
    background: 'linear-gradient(45deg, #ffffff, #f0f8ff)',
    color: '#2563eb',
    padding: '15px 30px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
    transform: 'translateY(0)'
  },
  secondaryBtn: {
    background: 'transparent',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: '600',
    border: '2px solid white',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)'
  },
  featuresSection: {
    padding: '80px 20px',
    background: '#f8f9fa'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#333',
    fontWeight: '700'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
    animation: 'slideUp 0.6s ease-out'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  featureTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
    fontWeight: '600'
  },
  featureDescription: {
    color: '#666',
    lineHeight: '1.6'
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '80px 20px',
    textAlign: 'center'
  },
  ctaTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: '700'
  },
  ctaText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: '0.9'
  },
  ctaButton: {
    background: 'white',
    color: '#667eea',
    padding: '15px 30px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)'
  }
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .pulse-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  .cta-button:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
  }
`;
document.head.appendChild(styleSheet);

export default Home;