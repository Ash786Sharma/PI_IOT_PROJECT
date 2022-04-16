import React from "react";
import ControlButton from "../components/controlButton/ControlButton";
import PidDiagram from "../components/piddiagram/PidDiagram";

const Controls = () => {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2>Process</h2>
          <PidDiagram />
        </div>
      </div>
      <div className="row">
        <ControlButton />
      </div>
    </div>
  );
};

export default Controls;
