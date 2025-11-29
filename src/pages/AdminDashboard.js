import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useScholarships } from '../hooks/useScholarships';
import { usePerformance } from '../hooks/usePerformance';
import NotificationBell from '../components/NotificationBell';
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
  const [filters, setFilters] = useState({
    minGpa: '',
    maxGpa: '',
    minPercentage: '',
    maxPercentage: '',
    minGateScore: '',
    maxGateScore: '',
    minTenthMarks: '',
    maxTenthMarks: '',
    minInterMarks: '',
    maxInterMarks: '',
    educationLevel: ''
  });
  
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesName = !searchFilter || app.studentName.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesGpa = (!filters.minGpa || app.gpa >= parseFloat(filters.minGpa)) &&
                        (!filters.maxGpa || app.gpa <= parseFloat(filters.maxGpa));
      const matchesPercentage = (!filters.minPercentage || app.percentage >= parseFloat(filters.minPercentage)) &&
                               (!filters.maxPercentage || app.percentage <= parseFloat(filters.maxPercentage));
      const matchesGate = (!filters.minGateScore || app.gateScore >= parseFloat(filters.minGateScore)) &&
                         (!filters.maxGateScore || app.gateScore <= parseFloat(filters.maxGateScore));
      const matchesTenth = (!filters.minTenthMarks || app.tenthMarks >= parseFloat(filters.minTenthMarks)) &&
                          (!filters.maxTenthMarks || app.tenthMarks <= parseFloat(filters.maxTenthMarks));
      const matchesInter = (!filters.minInterMarks || app.interMarks >= parseFloat(filters.minInterMarks)) &&
                          (!filters.maxInterMarks || app.interMarks <= parseFloat(filters.maxInterMarks));
      const matchesLevel = !filters.educationLevel || app.educationLevel === filters.educationLevel;
      
      return matchesName && matchesGpa && matchesPercentage && matchesGate && matchesTenth && matchesInter && matchesLevel;
    });
  }, [applications, searchFilter, filters]);
  
  const stats = useMemo(() => ({
    pending: filteredApplications.filter(app => app.status === 'pending').length,
    approved: filteredApplications.filter(app => app.status === 'approved').length,
    totalAmount: filteredApplications.reduce((sum, app) => sum + (app.amount || 0), 0)
  }), [filteredApplications]);
  
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
          <NotificationBell />
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
                    <select
                      value={newScholarship.category}
                      onChange={(e) => setNewScholarship({...newScholarship, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Academic">Academic</option>
                      <option value="STEM">STEM</option>
                      <option value="Arts">Arts</option>
                      <option value="Sports">Sports</option>
                      <option value="Community Service">Community Service</option>
                      <option value="Leadership">Leadership</option>
                    </select>
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

        <section className="applications-section purple-theme">
          <div className="section-header">
            <h2 className="purple-title">Applications Review</h2>
            <div className="filter-controls">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="search-input"
              />
              <div className="filter-row">
                <div className="filter-group">
                  <label>GPA Range:</label>
                  <input
                    type="number"
                    placeholder="Min"
                    step="0.1"
                    min="0"
                    max="4"
                    value={filters.minGpa}
                    onChange={(e) => setFilters({...filters, minGpa: e.target.value})}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    step="0.1"
                    min="0"
                    max="4"
                    value={filters.maxGpa}
                    onChange={(e) => setFilters({...filters, maxGpa: e.target.value})}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Percentage:</label>
                  <input
                    type="number"
                    placeholder="Min %"
                    min="0"
                    max="100"
                    value={filters.minPercentage}
                    onChange={(e) => setFilters({...filters, minPercentage: e.target.value})}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max %"
                    min="0"
                    max="100"
                    value={filters.maxPercentage}
                    onChange={(e) => setFilters({...filters, maxPercentage: e.target.value})}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>GATE Score:</label>
                  <input
                    type="number"
                    placeholder="Min"
                    min="0"
                    max="100"
                    value={filters.minGateScore}
                    onChange={(e) => setFilters({...filters, minGateScore: e.target.value})}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min="0"
                    max="100"
                    value={filters.maxGateScore}
                    onChange={(e) => setFilters({...filters, maxGateScore: e.target.value})}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>10th Marks:</label>
                  <input
                    type="number"
                    placeholder="Min %"
                    min="0"
                    max="100"
                    value={filters.minTenthMarks}
                    onChange={(e) => setFilters({...filters, minTenthMarks: e.target.value})}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max %"
                    min="0"
                    max="100"
                    value={filters.maxTenthMarks}
                    onChange={(e) => setFilters({...filters, maxTenthMarks: e.target.value})}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Inter Marks:</label>
                  <input
                    type="number"
                    placeholder="Min %"
                    min="0"
                    max="100"
                    value={filters.minInterMarks}
                    onChange={(e) => setFilters({...filters, minInterMarks: e.target.value})}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max %"
                    min="0"
                    max="100"
                    value={filters.maxInterMarks}
                    onChange={(e) => setFilters({...filters, maxInterMarks: e.target.value})}
                    className="filter-input"
                  />
                </div>
                <div className="filter-group">
                  <label>Education Level:</label>
                  <select
                    value={filters.educationLevel}
                    onChange={(e) => setFilters({...filters, educationLevel: e.target.value})}
                    className="filter-select"
                  >
                    <option value="">All Levels</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </div>
                <button 
                  onClick={() => setFilters({minGpa: '', maxGpa: '', minPercentage: '', maxPercentage: '', minGateScore: '', maxGateScore: '', minTenthMarks: '', maxTenthMarks: '', minInterMarks: '', maxInterMarks: '', educationLevel: ''})}
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
          <AnimatedCard delay={500} className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Scholarship</th>
                  <th>Level</th>
                  <th>GPA</th>
                  <th>Percentage</th>
                  <th>10th Marks</th>
                  <th>Inter Marks</th>
                  <th>GATE Score</th>
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
                        <span className="student-id">ID: {app.id}00{Math.floor(Math.random() * 999) + 100}</span>
                      </div>
                    </td>
                    <td>{app.scholarship}</td>
                    <td>
                      <span className={`level-badge ${app.educationLevel}`}>
                        {app.educationLevel === 'undergraduate' ? 'UG' : 'PG'}
                      </span>
                    </td>
                    <td>{app.gpa}</td>
                    <td>{app.percentage}%</td>
                    <td>{app.tenthMarks}%</td>
                    <td>{app.interMarks}%</td>
                    <td>{app.gateScore}</td>
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