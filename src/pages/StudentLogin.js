import React from 'react';
import './Auth.css';

function StudentLogin() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">ScholarTrack</h1>
          <p className="auth-subtitle">Student Portal - Manage your scholarship applications</p>
        </div>
        
        <div className="user-type-badge">
          👨‍🎓 Student Access
        </div>
        
        {/* Student-specific login form */}
        <form className="auth-form">
          {/* Student login fields */}
        </form>
        
        <div className="switch-portal">
          <p>Are you an administrator? <a href="/admin-login">Access Admin Portal</a></p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;