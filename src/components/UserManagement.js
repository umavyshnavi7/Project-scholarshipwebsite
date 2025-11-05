// src/components/UserManagement.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function UserManagement() {
  const { user, getAllUsers, updateUserRole, deleteUser, createAdmin } = useAuth();
  const [users, setUsers] = useState(getAllUsers());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createAdmin(newAdmin);
      setUsers(getAllUsers());
      setNewAdmin({ name: '', email: '', password: '', confirmPassword: '' });
      setShowCreateForm(false);
      setSuccess('Admin account created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    setError('');
    
    try {
      await updateUserRole(userId, newRole);
      setUsers(getAllUsers());
      setSuccess(`User role updated to ${newRole}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      setLoading(true);
      setError('');
      
      try {
        await deleteUser(userId);
        setUsers(getAllUsers());
        setSuccess('User deleted successfully');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const studentCount = users.filter(u => u.role === 'student').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>User Management</h3>
        <button 
          onClick={() => setShowCreateForm(true)}
          style={styles.primaryBtn}
        >
          + Create New Admin
        </button>
      </div>

      {/* Statistics */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h4 style={styles.statNumber}>{users.length}</h4>
          <p style={styles.statLabel}>Total Users</p>
        </div>
        <div style={styles.statCard}>
          <h4 style={styles.statNumber}>{adminCount}</h4>
          <p style={styles.statLabel}>Admin Users</p>
        </div>
        <div style={styles.statCard}>
          <h4 style={styles.statNumber}>{studentCount}</h4>
          <p style={styles.statLabel}>Students</p>
        </div>
      </div>

      {/* Messages */}
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      {/* Users Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Created</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(userItem => (
              <tr key={userItem.id} style={styles.tr}>
                <td style={styles.td}>{userItem.name}</td>
                <td style={styles.td}>{userItem.email}</td>
                <td style={styles.td}>
                  <select
                    value={userItem.role}
                    onChange={(e) => handleRoleChange(userItem.id, e.target.value)}
                    style={{
                      ...styles.roleSelect,
                      ...(userItem.role === 'admin' ? styles.adminRole : styles.studentRole)
                    }}
                    disabled={loading}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={styles.td}>
                  {new Date(userItem.createdAt).toLocaleDateString()}
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDeleteUser(userItem.id, userItem.name)}
                    style={styles.deleteBtn}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div style={styles.noUsers}>
            <p>No other users found.</p>
          </div>
        )}
      </div>

      {/* Create Admin Modal */}
      {showCreateForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>Create New Admin Account</h3>
              <button 
                onClick={() => setShowCreateForm(false)}
                style={styles.closeBtn}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateAdmin} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  required
                  style={styles.input}
                  placeholder="Enter full name"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  required
                  style={styles.input}
                  placeholder="Enter email address"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Password *</label>
                <input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin(prev => ({
                    ...prev,
                    password: e.target.value
                  }))}
                  required
                  style={styles.input}
                  placeholder="Create password"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password *</label>
                <input
                  type="password"
                  value={newAdmin.confirmPassword}
                  onChange={(e) => setNewAdmin(prev => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))}
                  required
                  style={styles.input}
                  placeholder="Confirm password"
                />
              </div>

              <div style={styles.formActions}>
                <button 
                  type="button" 
                  onClick={() => setShowCreateForm(false)}
                  style={styles.secondaryBtn}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  style={styles.primaryBtn}
                >
                  {loading ? 'Creating...' : 'Create Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    margin: '0',
    color: '#1f2937',
    fontSize: '1.5rem'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2563eb',
    margin: '0 0 0.5rem 0'
  },
  statLabel: {
    color: '#6b7280',
    margin: '0'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    background: '#f8fafc',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '2px solid #e5e7eb'
  },
  tr: {
    borderBottom: '1px solid #e5e7eb'
  },
  td: {
    padding: '1rem',
    color: '#4b5563'
  },
  roleSelect: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '2px solid #e5e7eb',
    fontWeight: '500'
  },
  adminRole: {
    background: '#dbeafe',
    color: '#1e40af',
    borderColor: '#93c5fd'
  },
  studentRole: {
    background: '#f0f9ff',
    color: '#0c4a6e',
    borderColor: '#bae6fd'
  },
  deleteBtn: {
    background: '#ef4444',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem'
  },
  noUsers: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6b7280'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem'
  },
  modal: {
    background: 'white',
    borderRadius: '12px',
    padding: '0',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #e5e7eb'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#6b7280'
  },
  form: {
    padding: '2rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '2px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem'
  },
  primaryBtn: {
    background: '#2563eb',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600'
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#2563eb',
    padding: '12px 24px',
    borderRadius: '8px',
    border: '2px solid #2563eb',
    cursor: 'pointer',
    fontWeight: '600'
  },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid #fecaca'
  },
  success: {
    background: '#f0fdf4',
    color: '#16a34a',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid #bbf7d0'
  }
};

export default UserManagement;