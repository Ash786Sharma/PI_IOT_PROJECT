import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ProgressBar.css";
const ProgressBar = ({ data, minRange, maxRange }) => {
  return (
    <div className="prog-bar">
      <CircularProgressbar
        value={data}
        minValue={minRange}
        maxValue={maxRange}
        text={maxRange === 150 ? `${data}℃` : `${data}%`}
      />
    </div>
  );
};

export default ProgressBar;
