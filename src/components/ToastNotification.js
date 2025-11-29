import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './ToastNotification.css';

const ToastNotification = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto hide
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  if (!isVisible && !isExiting) return null;

  return (
    <div className={`toast-notification ${type} ${isVisible ? 'show' : ''} ${isExiting ? 'exit' : ''}`}>
      <div className="toast-content">
        <span className="toast-icon">{getIcon()}</span>
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={handleClose}>×</button>
      </div>
      <div className="toast-progress">
        <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
      </div>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration + 500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    let container = document.getElementById('toast-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-root';
      container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 999999; pointer-events: none;';
      document.body.appendChild(container);
    }
    
    return () => {
      if (container && toasts.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, [toasts]);

  const ToastContainer = () => {
    useEffect(() => {
      const container = document.getElementById('toast-root');
      if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
          <div className="toast-container">
            {toasts.map(toast => (
              <ToastNotification
                key={toast.id}
                message={toast.message}
                type={toast.type}
                duration={toast.duration}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </div>
        );
      }
    }, [toasts]);
    
    return null;
  };

  return { addToast, ToastContainer };
};

export default ToastNotification;