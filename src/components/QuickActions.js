import React from 'react';
import './QuickActions.css';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'search',
      icon: 'S',
      label: 'Search',
      title: 'Smart Search',
      description: 'Find scholarships that match your profile',
      color: '#667eea'
    },
    {
      id: 'profile',
      icon: 'P',
      label: 'Profile',
      title: 'Complete Profile',
      description: 'Boost your chances by 40%',
      color: '#4CAF50'
    },
    {
      id: 'deadlines',
      icon: 'D',
      label: 'Deadlines',
      title: 'View Deadlines',
      description: 'Never miss an opportunity',
      color: '#FF9800'
    },
    {
      id: 'tips',
      icon: 'T',
      label: 'Tips',
      title: 'Application Tips',
      description: 'Expert advice for success',
      color: '#9C27B0'
    }
  ];

  return (
    <div className="quick-actions">
      <h3 className="quick-actions-title">Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <div
            key={action.id}
            className="action-card"
            style={{
              '--action-color': action.color,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => onAction(action.id)}
          >
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <h4 className="action-title">{action.title}</h4>
              <p className="action-description">{action.description}</p>
            </div>
            <div className="action-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
