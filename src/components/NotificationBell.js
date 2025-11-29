<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./NotificationBell.css";

function NotificationBell({ notifications = [] }) {
  const [show, setShow] = useState(false);
  const bellRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // Calculate popup position whenever bell is clicked
  const updatePosition = () => {
    if (bellRef.current) {
      const rect = bellRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,   // 8px below bell
        left: rect.left - 220 + rect.width, // align right edges
      });
    }
  };

  // Toggle popup + update coordinates
  const togglePopup = () => {
    if (!show) updatePosition();
    setShow(!show);
  };

  // Update popup position on scroll or resize
  useEffect(() => {
    if (!show) return;

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);

  // Click outside closes popup
  useEffect(() => {
    const handleClick = (e) => {
      if (
        bellRef.current &&
        !bellRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
=======
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import './NotificationBell.css';

const NotificationBell = () => {
  const { state, dispatch } = useApp();
  const { notifications = [] } = state;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;
>>>>>>> 942e5688be96ee1b7c47648cc9768fc27886a6ac

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
<<<<<<< HEAD
      <div
        className="bell-anchor"
        ref={bellRef}
        onClick={togglePopup}
      >
        <span className="notification-bell">🔔</span>
        {notifications.length > 0 && (
          <span className="notif-count">{notifications.length}</span>
        )}
      </div>

      {/* Popup rendered ABOVE EVERYTHING using portal */}
      {show &&
        ReactDOM.createPortal(
          <div
            className="notif-portal-popup"
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            <h4 className="notif-title">Notifications</h4>

=======
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
>>>>>>> 942e5688be96ee1b7c47648cc9768fc27886a6ac
            {notifications.length === 0 ? (
              <p className="empty-msg">No new notifications</p>
            ) : (
<<<<<<< HEAD
              notifications.map((n) => (
                <div key={n.id} className="notif-item">
                  <p>{n.message}</p>
                  {n.time && <span className="notif-time">{n.time}</span>}
                </div>
              ))
            )}
          </div>,
          document.body
        )}
=======
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
>>>>>>> 942e5688be96ee1b7c47648cc9768fc27886a6ac
    </>
  );
}

export default NotificationBell;
