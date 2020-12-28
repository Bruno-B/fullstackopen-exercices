import React, { useEffect, useState } from "react";

const Notification = ({ message, color }) => {
  const [notifcation, setNotification] = useState(message);
  const style = {
    border: `2px solid ${color}`,
    backgroundColor: "#d3d3d3",
    color,
    display: "inline",
  };
  const hide = {
    display: "hidden",
  };

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, [notifcation]);

  return <div style={notifcation !== null ? style : hide}>{notifcation}</div>;
};

export default Notification;
