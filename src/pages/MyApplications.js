// src/pages/MyApplications.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useScholarships } from '../context/ScholarshipContext';

function MyApplications() {
  const { user } = useAuth();
  const { applications, scholarships } = useScholarships();

  const userApplications = applications.filter(app => app.studentId === user?.id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'in-review': return '#f59e0b';
      case 'pending': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'in-review': return 'In Review';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const getScholarshipById = (scholarshipId) => {
    return scholarships.find(s => s.id === scholarshipId);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Applications</h1>
          <Link to="/scholarships" style={styles.primaryBtn}>
            Browse More Scholarships
          </Link>
        </div>

        {userApplications.length === 0 ? (
          <div style={styles.noApplications}>
            <h3>No applications yet</h3>
            <p>Start applying for scholarships to see your applications here.</p>
            <Link to="/scholarships" style={styles.primaryBtn}>
              Browse Scholarships
            </Link>
          </div>
        ) : (
          <div style={styles.applicationsList}>
            {userApplications.map((app) => {
              const scholarship = getScholarshipById(app.scholarshipId);
              return (
                <div key={app.id} style={styles.applicationCard}>
                  <div style={styles.appHeader}>
                    <div style={styles.appTitle}>
                      <h3 style={styles.appName}>{app.scholarshipTitle}</h3>
                      <p style={styles.appOrg}>{app.organization}</p>
                      <small style={styles.appDate}>
                        Applied on {new Date(app.appliedDate).toLocaleDateString()}
                      </small>
                    </div>
                    <span 
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(app.status)
                      }}
                    >
                      {getStatusText(app.status)}
                    </span>
                  </div>
                  
                  {scholarship && (
                    <div style={styles.scholarshipInfo}>
                      <div style={styles.infoItem}>
                        <strong>Amount:</strong> {scholarship.amount}
                      </div>
                      <div style={styles.infoItem}>
                        <strong>Deadline:</strong> 
                        {new Date(scholarship.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  <div style={styles.progressSection}>
                    <h4 style={styles.progressTitle}>Application Progress</h4>
                    <div style={styles.progressBar}>
                      <div 
                        style={{
                          ...styles.progressFill,
                          width: `${app.progress}%`
                        }}
                      ></div>
                    </div>
                    <span style={styles.progressText}>{app.progress}%</span>
                  </div>

                  <div style={styles.actions}>
                    <Link 
                      to={`/scholarships/${app.scholarshipId}`}
                      style={styles.secondaryBtn}
                    >
                      View Scholarship
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '40px 20px',
    minHeight: '80vh',
    background: '#f8fafc'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    color: '#1f2937'
  },
  primaryBtn: {
    background: '#2563eb',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600'
  },
  noApplications: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#6b7280'
  },
  applicationsList: {
    display: 'grid',
    gap: '1.5rem'
  },
  applicationCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  appHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  appTitle: {
    flex: 1
  },
  appName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 0.25rem 0'
  },
  appOrg: {
    color: '#6b7280',
    margin: '0 0 0.5rem 0'
  },
  appDate: {
    color: '#9ca3af'
  },
  statusBadge: {
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  scholarshipInfo: {
    background: '#f8fafc',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  infoItem: {
    marginBottom: '0.5rem'
  },
  progressSection: {
    marginBottom: '1rem'
  },
  progressTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    background: '#10b981',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  actions: {
    textAlign: 'right'
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#2563eb',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
    border: '2px solid #2563eb'
  }
};

export default MyApplications;