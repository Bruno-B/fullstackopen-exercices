import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    if (notification) return;
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  });

  if (notification) return <div style={style}> {notification} </div>;
  else return null;
};

export default Notification;
