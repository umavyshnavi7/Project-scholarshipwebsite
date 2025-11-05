// src/pages/Scholarships.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScholarships } from '../context/ScholarshipContext';

function Scholarships() {
  const { scholarships, searchScholarships, loading } = useScholarships();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [filters, setFilters] = useState({
    category: ''
  });

  useEffect(() => {
    const results = searchScholarships(searchQuery, filters);
    setFilteredScholarships(results);
  }, [searchQuery, filters, scholarships]);

  const categories = [...new Set(scholarships.map(s => s.category))];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value) => {
    setFilters(prev => ({
      ...prev,
      category: value
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ category: '' });
  };

  if (loading) {
    return <div style={styles.loading}>Loading scholarships...</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Available Scholarships</h1>
          <p style={styles.subtitle}>Discover opportunities to fund your education</p>
        </div>

        <div style={styles.searchFilters}>
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search scholarships by title, organization, or description..."
              value={searchQuery}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filters}>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button onClick={clearFilters} style={styles.clearBtn}>
              Clear Filters
            </button>
          </div>
        </div>

        <div style={styles.scholarshipsGrid}>
          {filteredScholarships.length === 0 ? (
            <div style={styles.noResults}>
              <h3>No scholarships found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            filteredScholarships.map(scholarship => (
              <div key={scholarship.id} style={styles.scholarshipCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{scholarship.title}</h3>
                  <span style={styles.amount}>{scholarship.amount}</span>
                </div>
                <p style={styles.organization}>{scholarship.organization}</p>
                <p style={styles.description}>
                  {scholarship.description.length > 120 
                    ? `${scholarship.description.substring(0, 120)}...`
                    : scholarship.description
                  }
                </p>
                <div style={styles.details}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Deadline:</span>
                    <span style={styles.detailValue}>
                      {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Category:</span>
                    <span style={styles.category}>
                      {scholarship.category}
                    </span>
                  </div>
                </div>
                <div style={styles.actions}>
                  <Link 
                    to={`/scholarships/${scholarship.id}`}
                    style={styles.viewBtn}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
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
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#1f2937'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#6b7280'
  },
  searchFilters: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  },
  searchBar: {
    marginBottom: '1.5rem'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  filterSelect: {
    padding: '8px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '6px',
    background: 'white'
  },
  clearBtn: {
    padding: '8px 16px',
    background: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  scholarshipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem'
  },
  scholarshipCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0',
    flex: 1,
    marginRight: '1rem'
  },
  amount: {
    background: '#10b981',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  organization: {
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '1rem'
  },
  description: {
    color: '#4b5563',
    marginBottom: '1.5rem',
    lineHeight: '1.5'
  },
  details: {
    marginBottom: '1.5rem'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  detailLabel: {
    fontWeight: '500',
    color: '#374151'
  },
  detailValue: {
    color: '#6b7280'
  },
  category: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '500'
  },
  actions: {
    textAlign: 'center'
  },
  viewBtn: {
    background: '#2563eb',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#6b7280'
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '3rem',
    color: '#6b7280'
  }
};

export default Scholarships;