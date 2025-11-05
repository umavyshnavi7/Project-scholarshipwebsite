import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useScholarships } from '../hooks/useScholarships';
import { usePerformance } from '../hooks/usePerformance';
import ThemeToggle from '../components/ThemeToggle';
import Chart from '../components/Chart';
import AnimatedCard from '../components/AnimatedCard';
import './AdminDashboard.css';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const { 
    scholarships, 
    applications, 
    addScholarship, 
    updateScholarship, 
    deleteScholarship, 
    updateApplicationStatus 
  } = useScholarships();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [expandedApp, setExpandedApp] = useState(null);
  const [newScholarship, setNewScholarship] = useState({
    title: '',
    description: '',
    amount: '',
    deadline: '',
    category: '',
    status: 'open'
  });

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus);
  };

  const handleAddScholarship = (e) => {
    e.preventDefault();
    addScholarship(newScholarship);
    setNewScholarship({
      title: '',
      description: '',
      amount: '',
      deadline: '',
      category: '',
      status: 'open'
    });
    setShowAddForm(false);
  };

  const handleDeleteScholarship = (id) => {
    deleteScholarship(id);
  };

  const editScholarship = (scholarship) => {
    setEditingScholarship(scholarship);
    setNewScholarship({
      title: scholarship.title,
      description: scholarship.description,
      amount: scholarship.amount.toString(),
      deadline: scholarship.deadline,
      category: scholarship.category,
      status: scholarship.status
    });
    setShowAddForm(true);
  };

  const handleEditScholarship = (e) => {
    e.preventDefault();
    updateScholarship(editingScholarship.id, newScholarship);
    setNewScholarship({
      title: '',
      description: '',
      amount: '',
      deadline: '',
      category: '',
      status: 'open'
    });
    setEditingScholarship(null);
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingScholarship(null);
    setNewScholarship({
      title: '',
      description: '',
      amount: '',
      deadline: '',
      category: '',
      status: 'open'
    });
    setShowAddForm(false);
  };

  const [searchFilter, setSearchFilter] = useState('');
  
  const { filteredData: filteredApplications, stats } = usePerformance(
    applications, 
    { studentName: searchFilter }
  );
  
  const scholarshipStats = useMemo(() => ({
    totalScholarships: scholarships.length,
    pendingApplications: stats.pending,
    approvedApplications: stats.approved,
    totalAwarded: stats.totalAmount
  }), [scholarships.length, stats]);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <h1>Scholarship Management - Admin Portal</h1>
        </div>
        <div className="header-right">
          <ThemeToggle />
          <span>Welcome, {user?.name}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="stats-grid">
        <AnimatedCard delay={0} className="stat-card">
          <h3>Total Scholarships</h3>
          <div className="stat-number">{scholarshipStats.totalScholarships}</div>
        </AnimatedCard>
        <AnimatedCard delay={100} className="stat-card">
          <h3>Pending Reviews</h3>
          <div className="stat-number">{scholarshipStats.pendingApplications}</div>
        </AnimatedCard>
        <AnimatedCard delay={200} className="stat-card">
          <h3>Approved</h3>
          <div className="stat-number">{scholarshipStats.approvedApplications}</div>
        </AnimatedCard>
        <AnimatedCard delay={300} className="stat-card">
          <h3>Total Awarded</h3>
          <div className="stat-number">${scholarshipStats.totalAwarded.toLocaleString()}</div>
        </AnimatedCard>
      </div>

      <AnimatedCard delay={400}>
        <Chart 
          title="Application Status Overview"
          data={[
            { label: 'Pending', value: scholarshipStats.pendingApplications },
            { label: 'Approved', value: scholarshipStats.approvedApplications },
            { label: 'Total', value: applications.length }
          ]}
        />
      </AnimatedCard>

      <div className="admin-content">
        <section className="scholarships-section">
          <div className="section-header">
            <h2>Scholarship Listings</h2>
            <button 
              className="btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              Add Scholarship
            </button>
          </div>

          {showAddForm && (
            <div className="add-scholarship-form">
              <h3>{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h3>
              <form onSubmit={editingScholarship ? handleEditScholarship : handleAddScholarship}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Scholarship Title</label>
                    <input
                      type="text"
                      placeholder="Enter scholarship title"
                      value={newScholarship.title}
                      onChange={(e) => setNewScholarship({...newScholarship, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Award Amount ($)</label>
                    <input
                      type="number"
                      placeholder="Enter amount in USD"
                      value={newScholarship.amount}
                      onChange={(e) => setNewScholarship({...newScholarship, amount: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Provide detailed description of the scholarship..."
                    value={newScholarship.description}
                    onChange={(e) => setNewScholarship({...newScholarship, description: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Application Deadline</label>
                    <input
                      type="date"
                      value={newScholarship.deadline}
                      onChange={(e) => setNewScholarship({...newScholarship, deadline: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      placeholder="e.g., Academic, STEM, Arts"
                      value={newScholarship.category}
                      onChange={(e) => setNewScholarship({...newScholarship, category: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingScholarship ? 'Update Scholarship' : 'Add Scholarship'}
                  </button>
                  <button type="button" onClick={cancelEdit}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="scholarships-grid">
            {scholarships.map(scholarship => (
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
                <div className="scholarship-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => editScholarship(scholarship)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteScholarship(scholarship.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="applications-section">
          <div className="section-header">
            <h2>Applications Review</h2>
            <input
              type="text"
              placeholder="Search by student name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="search-input"
            />
          </div>
          <AnimatedCard delay={500} className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Scholarship</th>
                  <th>GPA</th>
                  <th>Amount</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(app => (
                  <tr key={app.id}>
                    <td>
                      <div className="student-info">
                        <strong>{app.studentName}</strong>
                        <small>{app.email}</small>
                      </div>
                    </td>
                    <td>{app.scholarship}</td>
                    <td>{app.gpa}</td>
                    <td>${app.amount.toLocaleString()}</td>
                    <td>{app.submittedDate}</td>
                    <td>
                      <span className={`status-badge ${app.status}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {app.status === 'pending' && (
                          expandedApp === app.id ? (
                            <>
                              <button 
                                className="btn-approve"
                                onClick={() => {
                                  handleStatusChange(app.id, 'approved');
                                  setExpandedApp(null);
                                }}
                              >
                                Approve
                              </button>
                              <button 
                                className="btn-reject"
                                onClick={() => {
                                  handleStatusChange(app.id, 'rejected');
                                  setExpandedApp(null);
                                }}
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <button 
                              className="btn-pending"
                              onClick={() => setExpandedApp(app.id)}
                            >
                              Pending
                            </button>
                          )
                        )}
                        {app.status === 'under review' && (
                          <>
                            <button 
                              className="btn-approve"
                              onClick={() => handleStatusChange(app.id, 'approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn-reject"
                              onClick={() => handleStatusChange(app.id, 'rejected')}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {app.status === 'approved' && (
                          <span className="approved-text">Approved</span>
                        )}
                        {app.status === 'rejected' && (
                          <span className="rejected-text">Rejected</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AnimatedCard>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;