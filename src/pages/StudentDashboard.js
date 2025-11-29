import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../hooks/useAuth';
import NotificationBell from '../components/NotificationBell';
import QuickActions from '../components/QuickActions';
import './StudentDashboard.css';

function StudentDashboard() {
  const { state } = useApp();
  const { user, notifications } = state;
  const { logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showProfile, setShowProfile] = useState(false);
  const [profileProgress, setProfileProgress] = useState(75);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [hasShownDeadlineReminder, setHasShownDeadlineReminder] = useState(false);
  const [hasShownProfileComplete, setHasShownProfileComplete] = useState(false);
  const [applications, setApplications] = useState([
    {
      id: 1,
      scholarship: "Merit-Based Excellence Scholarship",
      submittedDate: "2025-10-15",
      amount: 5000,
      status: "pending"
    },
    {
      id: 2,
      scholarship: "STEM Innovation Grant",
      submittedDate: "2025-09-20",
      amount: 3000,
      status: "approved"
    }
  ]);

  const [availableScholarships] = useState([
    {
      id: 1,
      title: "Athletic Excellence Scholarship",
      description: "Supporting outstanding student-athletes who excel in sports and academics.",
      amount: 4000,
      deadline: "2025-12-15",
      category: "Sports",
      status: "open",
      eligibility: "GPA 3.5+, Sports participation",
      applicants: 45
    },
    {
      id: 2,
      title: "Sports Leadership Grant",
      description: "For students who demonstrate leadership skills in sports and team activities.",
      amount: 3500,
      deadline: "2026-01-30",
      category: "Sports",
      status: "open",
      eligibility: "Leadership experience required",
      applicants: 32
    },
    {
      id: 3,
      title: "STEM Innovation Award",
      description: "For students pursuing Science, Technology, Engineering, or Mathematics degrees.",
      amount: 6000,
      deadline: "2025-11-20",
      category: "STEM",
      status: "open",
      eligibility: "STEM major, GPA 3.7+",
      applicants: 78
    },
    {
      id: 4,
      title: "Community Service Excellence",
      description: "Recognizing students who make significant contributions to their communities.",
      amount: 2500,
      deadline: "2026-02-10",
      category: "Community Service",
      status: "open",
      eligibility: "100+ volunteer hours",
      applicants: 23
    }
  ]);

  const [showApplicationForm, setShowApplicationForm] = useState(null);
  const [applicationData, setApplicationData] = useState({
    educationLevel: 'undergraduate',
    gpa: '',
    percentage: '',
    gateScore: '',
    tenthMarks: '',
    interMarks: ''
  });

  const applyForScholarship = (scholarshipId) => {
    setShowApplicationForm(scholarshipId);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'search':
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
          searchInput.focus();
          searchInput.value = '';
          setSearchTerm('');
          setSelectedCategory('All Categories');
        }
        break;
      case 'profile':
        setShowProfile(!showProfile);
        break;
      case 'deadlines':
        // Filter to show only scholarships with deadlines within 30 days
        const urgentScholarships = availableScholarships.filter(s => {
          const daysLeft = Math.ceil((new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24));
          return daysLeft <= 30 && daysLeft > 0;
        });
        if (urgentScholarships.length > 0) {
          setSearchTerm(urgentScholarships[0].title.split(' ')[0]);
        }
        break;
      case 'tips':
        // Show application tips modal or expand profile completion
        if (profileProgress < 100) {
          setShowProfile(true);
        }
        break;
      default:
        break;
    }
  };

  const submitApplication = (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (!applicationData.gpa || !applicationData.percentage || !applicationData.gateScore || 
        !applicationData.tenthMarks || !applicationData.interMarks) {
      alert('Please fill in all required fields');
      return;
    }
    
    const scholarship = availableScholarships.find(s => s.id === showApplicationForm);
    const newApplication = {
      id: applications.length + 1,
      studentName: user?.name || 'Student',
      email: user?.email || 'student@email.com',
      scholarship: scholarship.title,
      educationLevel: applicationData.educationLevel,
      gpa: parseFloat(applicationData.gpa),
      percentage: parseFloat(applicationData.percentage),
      gateScore: parseFloat(applicationData.gateScore),
      tenthMarks: parseFloat(applicationData.tenthMarks),
      interMarks: parseFloat(applicationData.interMarks),
      submittedDate: new Date().toISOString().split('T')[0],
      amount: scholarship.amount,
      status: "pending"
    };
    setApplications([...applications, newApplication]);
    setApplicationData({ educationLevel: 'undergraduate', gpa: '', percentage: '', gateScore: '', tenthMarks: '', interMarks: '' });
    setShowApplicationForm(null);
    alert(`Successfully applied for ${scholarship.title}! 🎉`);
  };

  // Filter scholarships based on search and category
  const filteredScholarships = availableScholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || scholarship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalApplications: applications.length,
    approved: applications.filter(app => app.status === 'approved').length,
    pending: applications.filter(app => app.status === 'pending').length,
    totalAwarded: applications.filter(app => app.status === 'approved')
      .reduce((sum, app) => sum + app.amount, 0)
  };

  // Calculate days until nearest deadline
  const nearestDeadline = availableScholarships
    .map(s => ({ 
      title: s.title, 
      days: Math.max(0, Math.ceil((new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
    }))
    .filter(s => s.days >= 0)
    .sort((a, b) => a.days - b.days)[0];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update profile progress randomly
      setProfileProgress(prev => {
        const newProgress = Math.min(100, prev + Math.random() * 2);
        if (newProgress === 100 && prev < 100 && !hasShownProfileComplete) {
          setHasShownProfileComplete(true);
        }
        return newProgress;
      });
    }, 5000);

    // Welcome message (only once)
    if (!hasShownWelcome) {
      setTimeout(() => {
        setHasShownWelcome(true);
      }, 1000);
    }

    // Deadline reminders (only once)
    if (nearestDeadline && nearestDeadline.days <= 7 && !hasShownDeadlineReminder) {
      setTimeout(() => {
        setHasShownDeadlineReminder(true);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [user?.name, nearestDeadline]);

  return (
    <div className="student-dashboard">

      <header className="student-header">
        <div className="header-left">
          <h1>Scholarship Management - Student Portal</h1>
        </div>
        <div className="header-right">
          <NotificationBell />
          <span>Welcome, {user?.name}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card animated-card clickable" onClick={() => {
          const applicationsSection = document.querySelector('.applications-section');
          if (applicationsSection) applicationsSection.scrollIntoView({ behavior: 'smooth' });
        }}>
          <div className="stat-header">
            <h3>Total Applications</h3>
            <div className="stat-badge">{stats.pending} pending</div>
          </div>
          <div className="stat-number">{stats.totalApplications}</div>
          <div className="stat-action">View All →</div>
        </div>
        
        <div className="stat-card animated-card clickable" onClick={() => {
          const approvedApps = applications.filter(app => app.status === 'approved');
          if (approvedApps.length > 0) {
            alert(`You have ${approvedApps.length} approved applications!`);
          } else {
            alert('No approved applications yet. Keep applying!');
          }
        }}>
          <div className="stat-header">
            <h3>Approved</h3>
            <div className="success-rate">{stats.totalApplications > 0 ? Math.round((stats.approved / stats.totalApplications) * 100) : 0}% rate</div>
          </div>
          <div className="stat-number">{stats.approved}</div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${(stats.approved / Math.max(stats.totalApplications, 1)) * 100}%`}}></div>
            </div>
          </div>
        </div>
        
        <div className="stat-card animated-card clickable" onClick={() => {
          if (stats.totalAwarded > 0) {
            const approvedApps = applications.filter(app => app.status === 'approved');
            const details = approvedApps.map(app => `${app.scholarship}: $${app.amount}`).join(', ');
            alert(`Awarded scholarships: ${details}`);
          } else {
            alert('No awards yet. Keep applying to increase your chances!');
          }
        }}>
          <div className="stat-header">
            <h3>Total Awarded</h3>
            <div className="award-count">{applications.filter(app => app.status === 'approved').length} awards</div>
          </div>
          <div className="stat-number">${stats.totalAwarded.toLocaleString()}</div>
          <div className="stat-action">View Details →</div>
        </div>
        
        <div className="stat-card animated-card deadline-card clickable" onClick={() => {
          if (nearestDeadline) {
            const scholarship = availableScholarships.find(s => s.title === nearestDeadline.title);
            if (scholarship) {
              const hasApplied = applications.some(app => app.scholarship === scholarship.title);
              if (!hasApplied) {
                applyForScholarship(scholarship.id);
              } else {
                alert('You already applied to this scholarship!');
              }
            }
          } else {
            alert('No urgent deadlines. Browse more scholarships!');
          }
        }}>
          <div className="stat-header">
            <h3>Next Deadline</h3>
            <div className="urgency-badge">{nearestDeadline && nearestDeadline.days <= 7 ? 'URGENT' : 'UPCOMING'}</div>
          </div>
          <div className="stat-number">{nearestDeadline ? nearestDeadline.days : 0}<span className="days-label">days</span></div>
          <div className="stat-trend">{nearestDeadline ? nearestDeadline.title.substring(0, 25) : 'No upcoming deadlines'}</div>
        </div>
      </div>

      {/* Quick Actions Widget */}
      <QuickActions onAction={handleQuickAction} />

      {/* Profile Completion Widget */}
      <div className="profile-widget">
        <div className="profile-header" onClick={() => setShowProfile(!showProfile)}>
          <div className="profile-info">
            <h3>Profile Completion</h3>
            <span className="profile-percentage">{Math.round(profileProgress)}%</span>
          </div>
          <div className="profile-progress-circle">
            <svg width="60" height="60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#e1e5e9" strokeWidth="4"/>
              <circle 
                cx="30" cy="30" r="25" fill="none" 
                stroke="#667eea" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 25}`}
                strokeDashoffset={`${2 * Math.PI * 25 * (1 - profileProgress / 100)}`}
                transform="rotate(-90 30 30)"
              />
            </svg>
          </div>
        </div>
        {showProfile && (
          <div className="profile-details">
            <div className="profile-item completed">
              <span>✅ Basic Information</span>
            </div>
            <div className="profile-item completed">
              <span>✅ Academic Records</span>
            </div>
            <div className="profile-item pending">
              <span>⏳ Upload Documents</span>
            </div>
            <div className="profile-item pending">
              <span>⏳ Add References</span>
            </div>
          </div>
        )}
      </div>

      <div className="student-content">
        <section className="browse-section">
          <h2>Browse Scholarships</h2>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Search scholarships..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option>All Categories</option>
              <option>Academic</option>
              <option>STEM</option>
              <option>Arts</option>
              <option>Sports</option>
              <option>Community Service</option>
              <option>Leadership</option>
            </select>
            <div className="results-count">
              {filteredScholarships.length} scholarships found
            </div>
          </div>

          <div className="scholarships-grid">
            {filteredScholarships.map(scholarship => {
              const hasApplied = applications.some(app => app.scholarship === scholarship.title);
              
              return (
                <div key={scholarship.id} className="scholarship-card interactive-card">
                  <div className="card-header">
                    <h4>{scholarship.title}</h4>
                    <div className="applicant-count">{scholarship.applicants} applicants</div>
                  </div>
                  <p>{scholarship.description}</p>
                  <div className="eligibility-info">
                    <strong>Eligibility:</strong> {scholarship.eligibility}
                  </div>
                  <div className="scholarship-details">
                    <span className="amount">${scholarship.amount.toLocaleString()}</span>
                    <span className="deadline">Deadline: {scholarship.deadline}</span>
                    <span className={`category ${scholarship.category.toLowerCase().replace(' ', '-')}`}>
                      {scholarship.category}
                    </span>
                  </div>
                  <div className="competition-meter">
                    <div className="meter-label">Competition Level</div>
                    <div className="meter-bar">
                      <div 
                        className="meter-fill" 
                        style={{width: `${Math.min((scholarship.applicants / 100) * 100, 100)}%`}}
                      ></div>
                    </div>
                    <div className="meter-text">
                      {scholarship.applicants < 30 ? 'Low' : scholarship.applicants < 60 ? 'Medium' : 'High'}
                    </div>
                  </div>
                  <button
                    className={`apply-btn ${hasApplied ? 'applied' : ''}`}
                    onClick={() => {
                      if (!hasApplied) {
                        applyForScholarship(scholarship.id);
                      }
                    }}
                    disabled={hasApplied}
                  >
                    {hasApplied ? '✓ Applied' : 'Apply Now'}
                  </button>
                  
                  {showApplicationForm === scholarship.id && (
                    <div className="application-form">
                      <h4>Application Details</h4>
                      <form onSubmit={submitApplication}>
                        <div className="form-group">
                          <label>Education Level:</label>
                          <select
                            value={applicationData.educationLevel}
                            onChange={(e) => setApplicationData({...applicationData, educationLevel: e.target.value})}
                            required
                          >
                            <option value="undergraduate">Undergraduate</option>
                            <option value="postgraduate">Postgraduate</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>GPA (0-4.0):</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="4"
                            value={applicationData.gpa}
                            onChange={(e) => setApplicationData({...applicationData, gpa: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Percentage (%):</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={applicationData.percentage}
                            onChange={(e) => setApplicationData({...applicationData, percentage: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>10th Marks (%):</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={applicationData.tenthMarks}
                            onChange={(e) => setApplicationData({...applicationData, tenthMarks: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Intermediate Marks (%):</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={applicationData.interMarks}
                            onChange={(e) => setApplicationData({...applicationData, interMarks: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>GATE Score:</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={applicationData.gateScore}
                            onChange={(e) => setApplicationData({...applicationData, gateScore: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="submit-btn">Submit Application</button>
                          <button type="button" onClick={() => setShowApplicationForm(null)} className="cancel-btn">Cancel</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="applications-section">
          <h2>My Applications</h2>
          <div className="applications-list">
            {applications.map(app => (
              <div key={app.id} className="application-card">
                <div className="app-info">
                  <h4>{app.scholarship}</h4>
                  <p>Submitted: {app.submittedDate}</p>
                  <p className="amount">Award Amount: ${app.amount.toLocaleString()}</p>
                </div>
                <div className="app-status">
                  <span className={`status-badge ${app.status}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentDashboard;