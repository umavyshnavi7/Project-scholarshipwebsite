import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useScholarships } from '../context/ScholarshipContext';
import { useAuth } from '../context/AuthContext';

function ScholarshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { scholarships, applyForScholarship, applications } = useScholarships();
  
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    essay: '',
    additionalInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scholarship = scholarships.find(s => s.id === parseInt(id));
  
  const hasApplied = applications.some(app => 
    app.scholarshipId === parseInt(id) && app.studentId === user?.id
  );

  if (!scholarship) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.errorState}>
            <h2>Scholarship Not Found</h2>
            <p>The scholarship you're looking for doesn't exist.</p>
            <Link to="/scholarships" style={styles.primaryBtn}>
              Back to Scholarships
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await applyForScholarship(scholarship.id, {
        ...applicationData,
        studentId: user.id,
        studentName: user.name
      });
      setShowApplicationForm(false);
      navigate('/my-applications');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const daysUntilDeadline = Math.ceil(
    (new Date(scholarship.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/scholarships" style={styles.backLink}>
          ← Back to Scholarships
        </Link>

        <div style={styles.content}>
          <div style={styles.main}>
            <div style={styles.header}>
              <h1 style={styles.title}>{scholarship.title}</h1>
              <div style={styles.meta}>
                <span style={styles.org}>{scholarship.organization}</span>
                <span style={styles.amountBadge}>{scholarship.amount}</span>
              </div>
            </div>

            <div style={styles.info}>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <strong>Deadline:</strong>
                  <span style={daysUntilDeadline <= 7 ? styles.urgent : {}}>
                    {new Date(scholarship.deadline).toLocaleDateString()}
                    {daysUntilDeadline <= 7 && ` (${daysUntilDeadline} days left!)`}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <strong>Category:</strong>
                  <span style={styles.categoryTag}>{scholarship.category}</span>
                </div>
                <div style={styles.infoItem}>
                  <strong>Eligibility:</strong>
                  <span>{scholarship.eligibility}</span>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3>Description</h3>
              <p>{scholarship.description}</p>
            </div>

            <div style={styles.section}>
              <h3>Application Requirements</h3>
              <ul style={styles.requirements}>
                {scholarship.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={styles.sidebar}>
            <div style={styles.applicationCard}>
              <h3>Ready to Apply?</h3>
              
              {hasApplied ? (
                <div style={styles.appliedStatus}>
                  <div style={styles.statusApplied}>Already Applied</div>
                  <p>You've already submitted an application for this scholarship.</p>
                  <Link to="/my-applications" style={styles.secondaryBtn}>
                    View Application
                  </Link>
                </div>
              ) : (
                <>
                  {!showApplicationForm ? (
                    <div style={styles.applySection}>
                      <p>Submit your application before the deadline.</p>
                      <button 
                        onClick={() => user ? setShowApplicationForm(true) : navigate('/login')}
                        style={styles.primaryBtn}
                      >
                        Apply Now
                      </button>
                      {!user && (
                        <p style={styles.loginPrompt}>
                          <Link to="/login">Login</Link> to apply for this scholarship
                        </p>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleApply} style={styles.applicationForm}>
                      <h4>Application Form</h4>
                      
                      {error && <div style={styles.error}>{error}</div>}
                      
                      <div style={styles.formGroup}>
                        <label>Personal Essay *</label>
                        <textarea
                          value={applicationData.essay}
                          onChange={(e) => setApplicationData(prev => ({
                            ...prev,
                            essay: e.target.value
                          }))}
                          placeholder="Tell us why you deserve this scholarship..."
                          rows="6"
                          required
                          style={styles.textarea}
                        />
                      </div>
                      
                      <div style={styles.formGroup}>
                        <label>Additional Information</label>
                        <textarea
                          value={applicationData.additionalInfo}
                          onChange={(e) => setApplicationData(prev => ({
                            ...prev,
                            additionalInfo: e.target.value
                          }))}
                          placeholder="Any additional information you'd like to share..."
                          rows="4"
                          style={styles.textarea}
                        />
                      </div>
                      
                      <div style={styles.formActions}>
                        <button 
                          type="button" 
                          onClick={() => setShowApplicationForm(false)}
                          style={styles.secondaryBtn}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          disabled={loading}
                          style={styles.primaryBtn}
                        >
                          {loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
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
  backLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
    marginBottom: '2rem',
    display: 'inline-block'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '3rem'
  },
  main: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#1f2937'
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  org: {
    fontSize: '1.2rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  amountBadge: {
    background: '#10b981',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600'
  },
  info: {
    background: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  infoGrid: {
    display: 'grid',
    gap: '1rem'
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e5e7eb'
  },
  urgent: {
    color: '#dc2626',
    fontWeight: '600'
  },
  categoryTag: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  section: {
    marginBottom: '2rem'
  },
  requirements: {
    listStyleType: 'disc',
    marginLeft: '1.5rem',
    color: '#4b5563'
  },
  sidebar: {
    position: 'sticky',
    top: '2rem',
    height: 'fit-content'
  },
  applicationCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e5e7eb'
  },
  appliedStatus: {
    textAlign: 'center'
  },
  statusApplied: {
    background: '#10b981',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: '500',
    marginBottom: '1rem'
  },
  applySection: {
    textAlign: 'center'
  },
  loginPrompt: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '1rem'
  },
  applicationForm: {
    textAlign: 'left'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  formActions: {
    display: 'flex',
    gap: '1rem'
  },
  primaryBtn: {
    background: '#2563eb',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block'
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#2563eb',
    padding: '12px 24px',
    borderRadius: '8px',
    border: '2px solid #2563eb',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block'
  },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid #fecaca'
  },
  errorState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#6b7280'
  }
};

export default ScholarshipDetail;