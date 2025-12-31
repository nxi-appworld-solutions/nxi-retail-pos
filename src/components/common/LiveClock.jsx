import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { getFormattedTime } from "../../utils/common";

const LiveClock = () => {
  const [time, setTime] = useState(getFormattedTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <li className="nav-item time-nav">
      <span className="bg-primary text-white d-inline-flex align-items-center">
        <ImageWithBasePath
          src="assets/img/icons/clock-icon.svg"
          alt="clock"
          className="me-2"
        />
        {time}
      </span>
    </li>
  );
};

export default LiveClock;
