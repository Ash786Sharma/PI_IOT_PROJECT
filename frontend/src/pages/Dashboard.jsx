import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import socketIO from "socket.io-client";
import ProgressBar from "../components/progressbar/ProgressBar";
import PidDiagram from "../components/piddiagram/PidDiagram";
import ProcessChart from "../components/processChart/ProcessChart";
const ENDPOINT = "http://localhost:4000/";
let socket;
const TIME_RANGE_IN_MILLISECONDS = 300000;
const Dashboard = () => {
  const alert = useAlert();
  const [temp, setTemp] = useState(0);
  const [level, setLevel] = useState(0);
  const nameList = ["Temperature", "Level"];
  const defaultDataList = nameList.map((name) => ({
    name: name,
    data: [],
  }));
  const [dataList, setDataList] = useState(defaultDataList);

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: [`websocket`] });

    socket.on(`connect`, () => {
      alert.success(`Welcome To Dashboard`);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [alert]);
  useEffect(() => {
    socket.on(`temperature_value`, (data) => {
      setTemp(data);
      // console.log(data);
    });
    socket.on(`level_value`, (data) => {
      setLevel(data);
      // console.log(data);
    });
    socket.on(`data_graph`, (data) => {
      setDataList(data);
      // console.log(data);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-9">
          <h2>Process</h2>
          <PidDiagram />
        </div>
        <div className="col-3">
          <h2>Temperature</h2>
          <ProgressBar data={temp} minRange={0} maxRange={150} />
          <div className="row">
            <div className="col-12">
              <h2>Level</h2>
              <ProgressBar data={level} minRange={0} maxRange={100} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>Process Graph</h2>
          <ProcessChart data={dataList} range={TIME_RANGE_IN_MILLISECONDS} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
