import React from 'react';
import './Auth.css';

function AdminLogin() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">ScholarTrack</h1>
          <p className="auth-subtitle">Admin Portal - Manage scholarships and users</p>
        </div>
        
        <div className="user-type-badge admin-badge">
          👨‍💼 Administrator Access
        </div>
        
        {/* Admin-specific login form */}
        <form className="auth-form">
          <div className="form-group">
            <label className="form-label">Admin Code</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter admin access code"
              required
            />
          </div>
          {/* Other admin fields */}
        </form>
        
        <div className="switch-portal">
          <p>Are you a student? <a href="/student-login">Access Student Portal</a></p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;