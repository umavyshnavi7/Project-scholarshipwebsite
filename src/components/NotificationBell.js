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

  return (
    <>
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

            {notifications.length === 0 ? (
              <p className="empty-msg">No new notifications</p>
            ) : (
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
    </>
  );
}

export default NotificationBell;
