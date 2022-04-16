import React, { useEffect, useRef } from "react";
import socketIO from "socket.io-client";
import "./PidDiagram.css";
const ENDPOINT = "http://localhost:4000/";
let socket;
var heater1;
var heater2;

const PidDiagram = () => {
  const pump = useRef(null);
  const agitator = useRef(null);
  const heater = useRef();
  const sov1 = useRef();
  const sov2 = useRef();
  const sov3 = useRef();
  const sov4 = useRef();

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: [`websocket`] });

    socket.on(`connect`, () => {
      console.log(`pidDig connected`);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("PUMP", (data) => {
      console.log();
      data === true
        ? pump.current.classList.add("active")
        : pump.current.classList.remove("active");
      console.log("PUMP: " + data.toString());
    });
    socket.on("AGITATOR", (data) => {
      data === true
        ? agitator.current.classList.add("active")
        : agitator.current.classList.remove("active");
      console.log("AGITATOR: " + data.toString());
    });
    socket.on("HEATER1", (data) => {
      heater1 = data;
      heater1 || heater2 === true
        ? heater.current.classList.add("active")
        : heater.current.classList.remove("active");
      console.log("HEATER: " + data.toString());
    });
    socket.on("HEATER2", (data) => {
      heater2 = data;
      heater1 || heater2 === true
        ? heater.current.classList.add("active")
        : heater.current.classList.remove("active");
      console.log("HEATER2: " + data.toString());
    });
    socket.on("SOV1", (data) => {
      console.log("SOV1 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      data === true
        ? sov1.current.classList.add("active")
        : sov1.current.classList.remove("active");
      console.log("SOV1: " + data.toString());
    });
    socket.on("SOV2", (data) => {
      console.log("SOV2 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      data === true
        ? sov2.current.classList.add("active")
        : sov2.current.classList.remove("active");
      console.log("SOV2: " + data.toString());
    });
    socket.on("SOV3", (data) => {
      console.log("SOV3 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      data === true
        ? sov3.current.classList.add("active")
        : sov3.current.classList.remove("active");
      console.log("SOV3: " + data.toString());
    });
    socket.on("SOV4", (data) => {
      console.log("SOV4 function called");
      console.log(data);
      var myJSON = JSON.stringify(data);
      console.log(myJSON);
      data === true
        ? sov4.current.classList.add("active")
        : sov4.current.classList.remove("active");
      console.log("SOV4: " + data.toString());
    });

    return () => {};
  }, []);

  return (
    <div className="pid-dig">
      <svg id="PID" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 610">
        <path
          className="cls-1"
          d="M7161.82,7004.55a9.93,9.93,0,0,1-.2,1.95v261.07h-.37v.23c0,
         18.24-50.61,33-113.05,33s-113.05-14.77-113.05-33a10.18,10.18,0,0,1,
         .36-2.68V7003.45h.27c2-17.73,51.8-31.92,113-31.92C7111.2,
         6971.53,7161.82,6986.31,7161.82,7004.55Z"
          transform="translate(-6628.93 -6891.78)"
        />
        <polygon
          className="cls-1 active"
          ref={sov4}
          points="606.65 339.16 582.17 339.16 593.39 319.08 582.17 299.01 606.65 299.01 595.43 319.08 606.65 339.16"
        />
        <text
          className="cls-2"
          transform="translate(102.00 550.00) scale(0.71 1)"
        >
          Sov1
        </text>
        <text
          className="cls-2"
          transform="translate(160.00 465.00) scale(0.71 1)"
        >
          Sov2
        </text>
        <text
          className="cls-2"
          transform="translate(300.00 470.00) scale(0.71 1)"
        >
          Heater
        </text>
        <text
          className="cls-2"
          transform="translate(270.00 50.00) scale(0.71 1)"
        >
          Agitator
        </text>
        <text
          className="cls-2"
          transform="translate(190.00 250.00) scale(0.71 1)"
        >
          Reactor
        </text>
        <text
          className="cls-2"
          transform="translate(470.00 550.00) scale(0.71 1)"
        >
          Pump
        </text>
        <text
          className="cls-2"
          transform="translate(654.00 550.00) scale(0.71 1)"
        >
          Sov3
        </text>
        <text
          className="cls-2"
          transform="translate(610.00 335.00) scale(0.71 1)"
        >
          Sov4
        </text>
        <ellipse
          className="cls-1 active"
          ref={agitator}
          cx="418.84"
          cy="31.41"
          rx="26.00"
          ry="26.00"
        />
        <text
          className="cls-2"
          transform="translate(406.28 47.27) scale(0.71 1)"
        >
          M
        </text>
        <ellipse
          className="cls-1"
          cx="390.89"
          cy="291.96"
          rx="29.08"
          ry="16.52"
        />
        <ellipse
          className="cls-1"
          cx="449.06"
          cy="291.96"
          rx="29.08"
          ry="16.52"
        />
        <line className="cls-1" x1="419.38" y1="58.7" x2="419.38" y2="286.71" />
        <ellipse
          className="cls-1 active"
          cx="493.57"
          cy="58.7"
          rx="14.00"
          ry="14.00"
        />
        <line className="cls-1" x1="493.57" y1="69.71" x2="493.57" y2="109.9" />
        <line
          className="cls-1"
          x1="519.94"
          y1="133.04"
          x2="596.50"
          y2="133.04"
        />
        <line
          className="cls-1"
          x1="594.64"
          y1="131.28"
          x2="594.64"
          y2="297.15"
        />
        <line
          className="cls-1"
          x1="240.99"
          y1="358.02"
          x2="319.44"
          y2="358.02"
        />
        <line className="cls-1" x1="243.3" y1="356.26" x2="243.3" y2="431.3" />
        <polygon
          className="cls-1 active"
          ref={sov2}
          points="254.98 472.83 230.5 472.83 241.72 452.75 230.5 432.68 254.98 432.68 243.76 452.75 254.98 472.83"
        />
        <line
          className="cls-1"
          x1="242.74"
          y1="472.83"
          x2="242.74"
          y2="569.78"
        />
        <line
          className="cls-1"
          x1="162.09"
          y1="569.78"
          x2="383.07"
          y2="569.78"
        />
        <polygon
          className="cls-1 active"
          ref={sov1}
          points="109.82 580.11 109.82 561.05 135.6 569.79 161.38 561.05 161.38 580.11 135.6 571.38 109.82 580.11"
        />
        <line
          className="cls-1"
          x1="27.28"
          y1="569.78"
          x2="109.82"
          y2="569.78"
        />
        <ellipse
          className="cls-1 active"
          ref={pump}
          cx="428.29"
          cy="569.78"
          rx="36.22"
          ry="35.22"
        />
        <polygon
          className="cls-1 active"
          ref={sov3}
          points="660 579.32 660 560.25 685.77 568.99 711.55 560.25 711.55 579.32 685.77 570.58 660 579.32"
        />
        <line className="cls-1" x1="473.52" y1="569.78" x2="660" y2="569.78" />
        <line
          className="cls-1"
          x1="594.64"
          y1="339.16"
          x2="594.64"
          y2="569.78"
        />
        <line
          className="cls-1"
          x1="711.55"
          y1="569.78"
          x2="792.38"
          y2="569.78"
        />
        <line
          className="cls-1"
          x1="380.07"
          y1="569.78"
          x2="478.52"
          y2="569.78"
        />
        <line
          className="cls-1"
          x1="409.56"
          y1="539.81"
          x2="465.52"
          y2="569.78"
        />
        <line
          className="cls-1"
          x1="465.41"
          y1="570.14"
          x2="407.45"
          y2="598.12"
        />
        <line
          className="cls-1"
          x1="419.27"
          y1="409.04"
          x2="419.27"
          y2="431.3"
        />
        <ellipse
          className="cls-1 active"
          ref={heater}
          cx="418.81"
          cy="455.74"
          rx="24.00"
          ry="24.00"
        />
        <line className="cls-1" x1="398.0" y1="456.95" x2="416.95" y2="442.4" />
        <line
          className="cls-1"
          x1="420.96"
          y1="465.66"
          x2="438.81"
          y2="454.11"
        />
        <line
          className="cls-1"
          x1="423.01"
          y1="468.19"
          x2="413.50"
          y2="442.99"
        />
        <line
          className="cls-1"
          x1="436.34"
          y1="453.67"
          x2="444.29"
          y2="453.67"
        />
        <line
          className="cls-1"
          x1="392.73"
          y1="456.49"
          x2="400.69"
          y2="456.49"
        />
        <line
          className="cls-1"
          x1="397.69"
          y1="482.85"
          x2="432.87"
          y2="439.44"
        />
        <polygon
          className="cls-1"
          points="395.51 489.62 405.91 485.82 394.6 480.82 395.51 489.62"
        />
        <text
          className="cls-3"
          transform="translate(-40.00 550.33) scale(0.84 1)"
        >
          Supply
        </text>
        <text
          className="cls-3"
          transform="translate(755.53 553.33) scale(0.84 1)"
        >
          Drain
        </text>
      </svg>
    </div>
  );
};

export default PidDiagram;
