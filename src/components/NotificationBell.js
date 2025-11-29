import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import './NotificationBell.css';

const NotificationBell = () => {
  const { state, dispatch } = useApp();
  const { notifications = [] } = state;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const markAsRead = (notificationId) => {
    dispatch({
      type: 'MARK_NOTIFICATION_READ',
      payload: notificationId
    });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' });
  };

  return (
    <>
      {isOpen && <div className="notification-overlay" />}
      <div className="notification-bell" ref={dropdownRef}>
        <button 
          className="bell-button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          🔔
          {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
        </button>
        
        {isOpen && (
          <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifications</h4>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark all read
              </button>
            )}
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="empty-msg">No new notifications</p>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="unread-dot"></div>}
                </div>
              ))
            )}
          </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NotificationBell;