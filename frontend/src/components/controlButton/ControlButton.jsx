import React, { Fragment, useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import { useAlert } from "react-alert";
import { Switch } from "@mui/material/";
import "./ControlButton.css";
const ENDPOINT = "https://pi-iot-project.herokuapp.com/";
let socket;

const ControlButton = () => {
  const [pump, setPump] = useState(false);
  const [agitator, setAgitator] = useState(false);
  const [heater1, setHeater1] = useState(false);
  const [heater2, setHeater2] = useState(false);
  const [sov1, setSov1] = useState(false);
  const [sov2, setSov2] = useState(false);
  const [sov3, setSov3] = useState(false);
  const [sov4, setSov4] = useState(false);
  const [fill, setFill] = useState(false);
  const [drain, setDrain] = useState(false);
  const [heat, setHeat] = useState(false);
  const [fillValue, setFillValue] = useState("");
  const [drainValue, setDrainValue] = useState("");
  const [heatValue, setHeatValue] = useState("");
  const fillSet = useRef();
  const drainSet = useRef();
  const heatSet = useRef();

  const alert = useAlert();
  const pumpChange = (e) => {
    e.preventDefault();
    console.log("PUMP toggle");
    socket.emit("PUMP_TOGGLE");
  };
  const agitatorChange = (e) => {
    e.preventDefault();
    console.log("AGITATOR toggle");
    socket.emit("AGITATOR_TOGGLE");
  };
  const heater1Change = (e) => {
    e.preventDefault();
    console.log("HEATER1 toggle");
    socket.emit("HEATER1_TOGGLE");
  };
  const heater2Change = (e) => {
    e.preventDefault();
    console.log("HEATER2 toggle");
    socket.emit("HEATER2_TOGGLE");
  };
  const sov1Change = (e) => {
    e.preventDefault();
    console.log("SOV1 toggle");
    socket.emit("SOV1_TOGGLE");
  };
  const sov2Change = (e) => {
    e.preventDefault();
    console.log("SOV2 toggle");
    socket.emit("SOV2_TOGGLE");
  };
  const sov3Change = (e) => {
    e.preventDefault();
    console.log("SOV3 toggle");
    socket.emit("SOV3_TOGGLE");
  };
  const sov4Change = (e) => {
    e.preventDefault();
    console.log("SOV4 toggle");
    socket.emit("SOV4_TOGGLE");
  };
  const fillChange = (e) => {
    e.preventDefault();
    console.log("FILL toggle");
    socket.emit("FILL_TOGGLE", fillValue);
  };
  const drainChange = (e) => {
    e.preventDefault();
    console.log("DRAIN toggle");
    socket.emit("DRAIN_TOGGLE", drainValue);
  };
  const heatChange = (e) => {
    e.preventDefault();
    console.log("HEAT toggle");
    socket.emit("HEAT_TOGGLE", heatValue);
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: [`websocket`] });

    socket.on(`connect`, () => {
      alert.success(`Welcome To Controls`);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [alert]);

  useEffect(() => {
    socket.on("PUMP", (data) => {
      console.log("PUMP function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setPump(data);
      console.log("PUMP: " + data.toString());
    });
    socket.on("AGITATOR", (data) => {
      console.log("AGITATOR function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setAgitator(data);
      console.log("AGITATOR: " + data.toString());
    });
    socket.on("HEATER1", (data) => {
      console.log("HEATER function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setHeater1(data);
      console.log("HEATER: " + data.toString());
    });
    socket.on("HEATER2", (data) => {
      console.log("HEATER2 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setHeater2(data);
      console.log("HEATER2: " + data.toString());
    });
    socket.on("SOV1", (data) => {
      console.log("SOV1 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setSov1(data);
      console.log("SOV1: " + data.toString());
    });
    socket.on("SOV2", (data) => {
      console.log("SOV2 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setSov2(data);
      console.log("SOV2: " + data.toString());
    });
    socket.on("SOV3", (data) => {
      console.log("SOV3 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setSov3(data);
      console.log("SOV3: " + data.toString());
    });
    socket.on("SOV4", (data) => {
      console.log("SOV4 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setSov4(data);
      console.log("SOV4: " + data.toString());
    });
    socket.on("FILL", (data) => {
      console.log("FILL function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setFill(data);
      console.log("FILL: " + data.toString());
    });
    socket.on("DRAIN", (data) => {
      console.log("DRAIN function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setDrain(data);
      console.log("DRAIN: " + data.toString());
    });
    socket.on("HEAT", (data) => {
      console.log("HEAT function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      setHeat(data);
      console.log("HEAT: " + data.toString());
    });
    socket.on("fillSet", (data) => {
      fillSet.current.value = data;
    });
    socket.on("drainSet", (data) => {
      drainSet.current.value = data;
    });
    socket.on("heatSet", (data) => {
      heatSet.current.value = data;
    });

    // socket.emit(`control_button`, gpio);
    return () => {
      socket.off();
    };
  }, []);

  return (
    <Fragment>
      <div className="col-2">
        <div className="card">
          <div className="switchContainer">
            <h3>Pump</h3>
            <Switch checked={pump} onChange={pumpChange} />
          </div>
        </div>
        <div className="card">
          <div className="switchContainer">
            <h3>SOV-1</h3>
            <Switch checked={sov1} onChange={sov1Change} />
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="card">
          <div className="switchContainer">
            <h3>Agitator</h3>
            <Switch checked={agitator} onChange={agitatorChange} />
          </div>
        </div>
        <div className="card">
          <div className="switchContainer">
            <h3>SOV-2</h3>
            <Switch checked={sov2} onChange={sov2Change} />
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="card">
          <div className="switchContainer">
            <h3>Heater1</h3>
            <Switch checked={heater1} onChange={heater1Change} />
          </div>
        </div>
        <div className="card">
          <div className="switchContainer">
            <h3>SOV-3</h3>
            <Switch checked={sov3} onChange={sov3Change} />
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="card">
          <div className="switchContainer">
            <h3>Heater2</h3>
            <Switch checked={heater2} onChange={heater2Change} />
          </div>
        </div>
        <div className="card">
          <div className="switchContainer">
            <h3>SOV-4</h3>
            <Switch checked={sov4} onChange={sov4Change} />
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="card">
          <div className="switchContainerInput">
            <h3>Filling</h3>
            <input
              className="processinput"
              type="number"
              ref={fillSet}
              onChange={(e) => setFillValue(Number(e.target.value))}
            />
            <Switch checked={fill} onChange={fillChange} />
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="card">
          <div className="switchContainerInput">
            <h3>Drain</h3>
            <input
              className="processinput"
              type="number"
              ref={drainSet}
              onChange={(e) => setDrainValue(e.target.value)}
            />
            <Switch checked={drain} onChange={drainChange} />
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="card">
          <div className="switchContainerInput">
            <h3>Heat</h3>
            <input
              className="processinput"
              type="number"
              ref={heatSet}
              onChange={(e) => setHeatValue(e.target.value)}
            />
            <Switch checked={heat} onChange={heatChange} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ControlButton;
