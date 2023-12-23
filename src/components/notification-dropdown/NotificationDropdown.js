import { UseHeaderContext } from "../../contexts/headerContext";
import "./NotificationDropdown.scss";
import { useEffect, useState } from "react";

function NotificationDropdown() {
  const [rotation, setRotation] = useState(0);
  const { notifyDropdownRef, setisNotifyDropdownOpen } = UseHeaderContext();

  const [notificationData, setNotificationData] = useState([]);

  const rotateButton = () => {
    setRotation(rotation + 360);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifyDropdownRef.current &&
        !notifyDropdownRef.current.contains(event.target)
      ) {
        const isIconClicked = event.target.classList.contains("bell-icon");
        if (
          !isIconClicked ||
          notifyDropdownRef.current.contains(event.target)
        ) {
          setisNotifyDropdownOpen((prev) => !prev);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [notifyDropdownRef, setisNotifyDropdownOpen]);

  return (
    <div className="dropdown-background">
      <div className="notifydropdown" ref={notifyDropdownRef}>
        <div className="notifydropdown-header">
          <div>
            <div className="heading">Notifications</div>
            <div className="sub-heading">
              All the notifications at one place!
            </div>
          </div>
          <span
            className="rfcbtn dx-icon dx-icon-refresh"
            onClick={rotateButton}
            style={{ transform: `rotate(${rotation}deg)` }}
            title="Refresh"
          ></span>
        </div>
        <div className="notifydropdown-body">
          {notificationData.map((notification, key) => (
            <div
              className={`notification ${notification.unread ? "unread" : ""}`}
              key={key}
            >
              <div>
                <div className="notify-title">
                  {notification.validationRuleName}
                </div>
                <div className="notify-time">{notification.module}</div>
                <div className="notify-time">{notification.message}</div>
              </div>
              {notification.unread && <div className="notify-unread"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationDropdown;
