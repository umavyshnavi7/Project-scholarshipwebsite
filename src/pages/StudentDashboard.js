import React, { useState } from 'react';
import './StudentDashboard.css';

function StudentDashboard({ user, onLogout }) {
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
      title: "Merit-Based Excellence Scholarship",
      description: "Awarded to students demonstrating outstanding academic achievement and leadership potential.",
      amount: 5000,
      deadline: "2025-12-31",
      category: "Academic",
      status: "open"
    },
    {
      id: 2,
      title: "STEM Innovation Grant",
      description: "Supporting students pursuing degrees in Science, Technology, Engineering, and Mathematics.",
      amount: 3000,
      deadline: "2025-11-30",
      category: "STEM",
      status: "open"
    },
    {
      id: 3,
      title: "Community Leadership Award",
      description: "Recognizing students who have made significant contributions to their communities.",
      amount: 2000,
      deadline: "2026-01-15",
      category: "Community Service",
      status: "open"
    }
  ]);

  const applyForScholarship = (scholarshipId) => {
    const scholarship = availableScholarships.find(s => s.id === scholarshipId);
    const newApplication = {
      id: applications.length + 1,
      scholarship: scholarship.title,
      submittedDate: new Date().toISOString().split('T')[0],
      amount: scholarship.amount,
      status: "pending"
    };
    setApplications([...applications, newApplication]);
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
          <span>Welcome, {user?.name}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
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
              <option>Community Service</option>
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