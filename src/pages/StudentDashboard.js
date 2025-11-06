import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../hooks/useAuth';
import NotificationBell from '../components/NotificationBell';
import './StudentDashboard.css';

function StudentDashboard() {
  const { state } = useApp();
  const { user, notifications } = state;
  const { logout } = useAuth();
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
      status: "open"
    },
    {
      id: 2,
      title: "Sports Leadership Grant",
      description: "For students who demonstrate leadership skills in sports and team activities.",
      amount: 3500,
      deadline: "2026-01-30",
      category: "Sports",
      status: "open"
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
    alert(`Applied for ${scholarship.title} successfully!`);
  };

  const stats = {
    totalApplications: applications.length,
    approved: applications.filter(app => app.status === 'approved').length,
    totalAwarded: applications.filter(app => app.status === 'approved')
      .reduce((sum, app) => sum + app.amount, 0)
  };

  return (
    <div className="student-dashboard">
      <header className="student-header">
        <div className="header-left">
          <h1>Scholarship Management - Student Portal</h1>
        </div>
        <div className="header-right">
          <NotificationBell notifications={notifications} />
          <span>Welcome, {user?.name}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <div className="stat-number">{stats.totalApplications}</div>
        </div>
        <div className="stat-card">
          <h3>Approved</h3>
          <div className="stat-number">{stats.approved}</div>
        </div>
        <div className="stat-card">
          <h3>Total Awarded</h3>
          <div className="stat-number">${stats.totalAwarded.toLocaleString()}</div>
        </div>
      </div>

      <div className="student-content">
        <section className="browse-section">
          <h2>Browse Scholarships</h2>
          <div className="search-bar">
            <input type="text" placeholder="Search scholarships..." />
            <select>
              <option>All Categories</option>
              <option>Academic</option>
              <option>STEM</option>
              <option>Arts</option>
              <option>Sports</option>
              <option>Community Service</option>
              <option>Leadership</option>
            </select>
          </div>

          <div className="scholarships-grid">
            {availableScholarships.map(scholarship => {
              const hasApplied = applications.some(app => app.scholarship === scholarship.title);
              
              return (
                <div key={scholarship.id} className="scholarship-card">
                  <h4>{scholarship.title}</h4>
                  <p>{scholarship.description}</p>
                  <div className="scholarship-details">
                    <span className="amount">${scholarship.amount.toLocaleString()}</span>
                    <span className="deadline">Deadline: {scholarship.deadline}</span>
                    <span className={`category ${scholarship.category.toLowerCase()}`}>
                      {scholarship.category}
                    </span>
                  </div>
                  <button
                    className={`apply-btn ${hasApplied ? 'applied' : ''}`}
                    onClick={() => applyForScholarship(scholarship.id)}
                    disabled={hasApplied}
                  >
                    {hasApplied ? 'Applied' : 'Apply Now'}
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