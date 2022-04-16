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
        text={`${data}%`}
      />
    </div>
  );
};

export default ProgressBar;
