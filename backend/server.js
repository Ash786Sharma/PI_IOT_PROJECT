const app = require("./app");
const http = require("http");
const socketIO = require("socket.io");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//gpio status
var PUMPvalue = false;
var AGITATORvalue = false;
var HEATER1value = false;
var HEATER2value = false;
var SOV1value = false;
var SOV2value = false;
var SOV3value = false;
var SOV4value = false;
var FILLvalue = false;
var DRAINvalue = false;
var HEATvalue = false;
var fillSet = 0;
var heatSet = 0;
var drainSet = 0;
var temp = 0;
var level = 0;
var TempSeries = [];
var LevelSeries = [];
var DataSeries = [];
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.messege}`);
  console.log("shutting down the server due to uncaught Exception ");
  process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
//connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Server
const server = http.createServer(app);
const io = socketIO(server);

const controller = (input, setPoint) => {
  var diff = setPoint - input;
  var outStart = 0;
  var outEnd = 1;
  var inStart = -100;
  var inEnd = 100;
  var output =
    outStart + ((outEnd - outStart) / (inEnd - inStart)) * (diff - inStart);
  var limitOutput = Math.min(Math.max(output, outStart), outEnd);
  limitOutput = outEnd - limitOutput;
  limitOutput = Math.round(limitOutput);
  if (limitOutput != 0) {
    return true;
  } else {
    return false;
  }
  // console.log(output);
  // console.log(limitOutput);
};

io.on(`connection`, (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.emit("PUMP", PUMPvalue);
  socket.emit("AGITATOR", AGITATORvalue);
  socket.emit("HEATER1", HEATER1value);
  socket.emit("HEATER2", HEATER2value);
  socket.emit("SOV1", SOV1value);
  socket.emit("SOV2", SOV2value);
  socket.emit("SOV3", SOV3value);
  socket.emit("SOV4", SOV4value);
  socket.emit("FILL", FILLvalue);
  socket.emit("DRAIN", DRAINvalue);
  socket.emit("HEAT", HEATvalue);
  socket.emit("fillSet", fillSet);
  socket.emit("heatSet", heatSet);
  socket.emit("drainSet", drainSet);

  socket.on("PUMP_TOGGLE", (data) => {
    if (PUMPvalue) PUMPvalue = false;
    else PUMPvalue = true;
    console.log("new PUMP value = " + PUMPvalue);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new PUMP state to ALL clients");
    io.emit("PUMP", PUMPvalue); //send button status to ALL clients
  });

  socket.on("AGITATOR_TOGGLE", (data) => {
    if (AGITATORvalue) AGITATORvalue = false;
    else AGITATORvalue = true;
    console.log("new AGITATOR value = " + AGITATORvalue);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new AGITATOR state to ALL clients");
    io.emit("AGITATOR", AGITATORvalue); //send button status to ALL clients
  });
  socket.on("HEATER1_TOGGLE", (data) => {
    if (HEATER1value) HEATER1value = false;
    else HEATER1value = true;
    console.log("new HEATER1 value = " + HEATER1value);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new HEATER1 state to ALL clients");
    io.emit("HEATER1", HEATER1value); //send button status to ALL clients
  });
  socket.on("HEATER2_TOGGLE", (data) => {
    if (HEATER2value) HEATER2value = false;
    else HEATER2value = true;
    console.log("new HEATER2 value = " + HEATER2value);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new HEATER2 state to ALL clients");
    io.emit("HEATER2", HEATER2value); //send button status to ALL clients
  });
  socket.on("SOV1_TOGGLE", (data) => {
    if (SOV1value) SOV1value = false;
    else SOV1value = true;
    console.log("new SOV1 value = " + SOV1value);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new SOV1 state to ALL clients");
    io.emit("SOV1", SOV1value); //send button status to ALL clients
  });
  socket.on("SOV2_TOGGLE", (data) => {
    if (SOV2value) SOV2value = false;
    else SOV2value = true;
    console.log("new SOV2 value = " + SOV2value);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new SOV2 state to ALL clients");
    io.emit("SOV2", SOV2value); //send button status to ALL clients
  });
  socket.on("SOV3_TOGGLE", (data) => {
    if (SOV3value) SOV3value = false;
    else SOV3value = true;
    console.log("new SOV3 value = " + SOV3value);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new SOV3 state to ALL clients");
    io.emit("SOV3", SOV3value); //send button status to ALL clients
  });
  socket.on("SOV4_TOGGLE", (data) => {
    if (SOV4value) SOV4value = false;
    else SOV4value = true;
    console.log("new SOV4 value = " + SOV4value);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new SOV4 state to ALL clients");
    io.emit("SOV4", SOV4value); //send button status to ALL clients
  });
  socket.on("FILL_TOGGLE", (data) => {
    fillSet = data;
    if (FILLvalue) FILLvalue = false;
    else FILLvalue = true;
    console.log("new FILL value = " + FILLvalue);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new FILL state to ALL clients");
    io.emit("FILL", FILLvalue); //send button status to ALL clients

    if (fillSet != "" && fillSet != 0 && fillSet <= 100) {
      console.log(fillSet);
      if (FILLvalue === true) {
        console.log(`filling initiated`);
        if (SOV4value) SOV4value = false;
        else SOV4value = true;
        console.log("new SOV4 value = " + SOV4value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV4 state to ALL clients");
        io.emit("SOV4", SOV4value); //send button status to ALL clients

        if (SOV1value) SOV1value = false;
        else SOV1value = true;
        console.log("new SOV1 value = " + SOV1value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV1 state to ALL clients");
        io.emit("SOV1", SOV1value); //send button status to ALL clients

        if (PUMPvalue) PUMPvalue = false;
        else PUMPvalue = true;
        console.log("new PUMP value = " + PUMPvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new PUMP state to ALL clients");
        io.emit("PUMP", PUMPvalue); //send button status to ALL clients
      } else {
        if (SOV4value) SOV4value = false;
        else SOV4value = true;
        console.log("new SOV4 value = " + SOV4value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV4 state to ALL clients");
        io.emit("SOV4", SOV4value); //send button status to ALL clients

        if (SOV1value) SOV1value = false;
        else SOV1value = true;
        console.log("new SOV1 value = " + SOV1value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV1 state to ALL clients");
        io.emit("SOV1", SOV1value); //send button status to ALL clients

        if (PUMPvalue) PUMPvalue = false;
        else PUMPvalue = true;
        console.log("new PUMP value = " + PUMPvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new PUMP state to ALL clients");
        io.emit("PUMP", PUMPvalue); //send button status to ALL clients
      }
    }
  });
  socket.on("DRAIN_TOGGLE", (data) => {
    drainSet = data;
    if (DRAINvalue) DRAINvalue = false;
    else DRAINvalue = true;
    console.log("new DRAIN value = " + DRAINvalue);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new DRAIN state to ALL clients");
    io.emit("DRAIN", DRAINvalue); //send button status to ALL clients

    if (drainSet != "" && drainSet != 0 && drainSet <= 100) {
      console.log(drainSet);
      if (DRAINvalue === true) {
        if (SOV2value) SOV2value = false;
        else SOV2value = true;
        console.log("new SOV2 value = " + SOV2value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV2 state to ALL clients");
        io.emit("SOV2", SOV2value); //send button status to ALL clients

        if (SOV3value) SOV3value = false;
        else SOV3value = true;
        console.log("new SOV3 value = " + SOV3value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV3 state to ALL clients");
        io.emit("SOV3", SOV3value); //send button status to ALL clients

        if (PUMPvalue) PUMPvalue = false;
        else PUMPvalue = true;
        console.log("new PUMP value = " + PUMPvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new PUMP state to ALL clients");
        io.emit("PUMP", PUMPvalue); //send button status to ALL clients
      } else {
        if (SOV2value) SOV2value = false;
        else SOV2value = true;
        console.log("new SOV2 value = " + SOV2value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV2 state to ALL clients");
        io.emit("SOV2", SOV2value); //send button status to ALL clients

        if (SOV3value) SOV3value = false;
        else SOV3value = true;
        console.log("new SOV3 value = " + SOV3value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV3 state to ALL clients");
        io.emit("SOV3", SOV3value); //send button status to ALL clients

        if (PUMPvalue) PUMPvalue = false;
        else PUMPvalue = true;
        console.log("new PUMP value = " + PUMPvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new PUMP state to ALL clients");
        io.emit("PUMP", PUMPvalue); //send button status to ALL clients
      }
    }
  });
  socket.on("HEAT_TOGGLE", (data) => {
    heatSet = data;
    if (HEATvalue) HEATvalue = false;
    else HEATvalue = true;
    console.log("new HEAT value = " + HEATvalue);
    // LED26.writeSync(GPIO26value); //turn LED on or off
    console.log("Send new HEAT state to ALL clients");
    io.emit("HEAT", HEATvalue); //send button status to ALL clients

    if (heatSet != "" && heatSet != 0 && heatSet <= 150) {
      console.log(heatSet);
      if (HEATvalue === true) {
        if (HEATER1value) HEATER1value = false;
        else HEATER1value = true;
        console.log("new HEATER1 value = " + HEATER1value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new HEATER1 state to ALL clients");
        io.emit("HEATER1", HEATER1value); //send button status to ALL clients

        if (HEATER2value) HEATER2value = false;
        else HEATER2value = true;
        console.log("new HEATER2 value = " + HEATER2value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new HEATER2 state to ALL clients");
        io.emit("HEATER2", HEATER2value); //send button status to ALL clients

        if (SOV2value) SOV2value = false;
        else SOV2value = true;
        console.log("new SOV2 value = " + SOV2value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV2 state to ALL clients");
        io.emit("SOV2", SOV2value); //send button status to ALL clients

        if (SOV4value) SOV4value = false;
        else SOV4value = true;
        console.log("new SOV4 value = " + SOV4value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV4 state to ALL clients");
        io.emit("SOV4", SOV4value); //send button status to ALL clients

        if (PUMPvalue) PUMPvalue = false;
        else PUMPvalue = true;
        console.log("new PUMP value = " + PUMPvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new PUMP state to ALL clients");
        io.emit("PUMP", PUMPvalue); //send button status to ALL clients

        if (AGITATORvalue) AGITATORvalue = false;
        else AGITATORvalue = true;
        console.log("new AGITATOR value = " + AGITATORvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new AGITATOR state to ALL clients");
        io.emit("AGITATOR", AGITATORvalue); //send button status to ALL clients
      } else {
        if (HEATER1value) HEATER1value = false;
        else HEATER1value = true;
        console.log("new HEATER1 value = " + HEATER1value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new HEATER1 state to ALL clients");
        io.emit("HEATER1", HEATER1value); //send button status to ALL clients

        if (HEATER2value) HEATER2value = false;
        else HEATER2value = true;
        console.log("new HEATER2 value = " + HEATER2value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new HEATER2 state to ALL clients");
        io.emit("HEATER2", HEATER2value); //send button status to ALL clients

        if (SOV2value) SOV2value = false;
        else SOV2value = true;
        console.log("new SOV2 value = " + SOV2value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV2 state to ALL clients");
        io.emit("SOV2", SOV2value); //send button status to ALL clients

        if (SOV4value) SOV4value = false;
        else SOV4value = true;
        console.log("new SOV4 value = " + SOV4value);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new SOV4 state to ALL clients");
        io.emit("SOV4", SOV4value); //send button status to ALL clients

        if (PUMPvalue) PUMPvalue = false;
        else PUMPvalue = true;
        console.log("new PUMP value = " + PUMPvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new PUMP state to ALL clients");
        io.emit("PUMP", PUMPvalue); //send button status to ALL clients

        if (AGITATORvalue) AGITATORvalue = false;
        else AGITATORvalue = true;
        console.log("new AGITATOR value = " + AGITATORvalue);
        // LED26.writeSync(GPIO26value); //turn LED on or off
        console.log("Send new AGITATOR state to ALL clients");
        io.emit("AGITATOR", AGITATORvalue); //send button status to ALL clients
      }
    }
  });

  socket.on(`temperature`, (data) => {
    // console.log(data);
    io.emit(`temperature_value`, data.toFixed(1));
    temp = data.toFixed(3);
    var heatdone = controller(temp, heatSet);
    if (HEATvalue === true && heatdone === true) {
      if (HEATER1value) HEATER1value = false;
      else HEATER1value = true;
      console.log("new HEATER1 value = " + HEATER1value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new HEATER1 state to ALL clients");
      io.emit("HEATER1", HEATER1value); //send button status to ALL clients

      if (HEATER2value) HEATER2value = false;
      else HEATER2value = true;
      console.log("new HEATER2 value = " + HEATER2value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new HEATER2 state to ALL clients");
      io.emit("HEATER2", HEATER2value); //send button status to ALL clients

      if (SOV2value) SOV2value = false;
      else SOV2value = true;
      console.log("new SOV2 value = " + SOV2value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new SOV2 state to ALL clients");
      io.emit("SOV2", SOV2value); //send button status to ALL clients

      if (SOV4value) SOV4value = false;
      else SOV4value = true;
      console.log("new SOV4 value = " + SOV4value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new SOV4 state to ALL clients");
      io.emit("SOV4", SOV4value); //send button status to ALL clients

      if (PUMPvalue) PUMPvalue = false;
      else PUMPvalue = true;
      console.log("new PUMP value = " + PUMPvalue);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new PUMP state to ALL clients");
      io.emit("PUMP", PUMPvalue); //send button status to ALL clients

      if (AGITATORvalue) AGITATORvalue = false;
      else AGITATORvalue = true;
      console.log("new AGITATOR value = " + AGITATORvalue);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new AGITATOR state to ALL clients");
      io.emit("AGITATOR", AGITATORvalue); //send button status to ALL clients

      if (HEATvalue) HEATvalue = false;
      else HEATvalue = true;
      console.log("new HEAT value = " + HEATvalue);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new HEAT state to ALL clients");
      io.emit("HEAT", HEATvalue); //send button status to ALL clients
    }
  });
  socket.on(`level`, (data) => {
    // console.log(data);
    io.emit(`level_value`, data.toFixed(1));
    level = data.toFixed(3);
    var filldone = controller(level, fillSet);
    if (FILLvalue === true && filldone === true) {
      if (SOV4value) SOV4value = false;
      else SOV4value = true;
      console.log("new SOV4 value = " + SOV4value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new SOV4 state to ALL clients");
      io.emit("SOV4", SOV4value); //send button status to ALL clients

      if (SOV1value) SOV1value = false;
      else SOV1value = true;
      console.log("new SOV1 value = " + SOV1value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new SOV1 state to ALL clients");
      io.emit("SOV1", SOV1value); //send button status to ALL clients

      if (PUMPvalue) PUMPvalue = false;
      else PUMPvalue = true;
      console.log("new PUMP value = " + PUMPvalue);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new PUMP state to ALL clients");
      io.emit("PUMP", PUMPvalue); //send button status to ALL clients

      if (FILLvalue) FILLvalue = false;
      else FILLvalue = true;
      console.log("new FILL value = " + FILLvalue);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new FILL state to ALL clients");
      io.emit("FILL", FILLvalue); //send button status to ALL clients
    }
    var draindone = controller(level, drainSet);
    if (DRAINvalue === true && draindone === false) {
      if (SOV2value) SOV2value = false;
      else SOV2value = true;
      console.log("new SOV2 value = " + SOV2value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new SOV2 state to ALL clients");
      io.emit("SOV2", SOV2value); //send button status to ALL clients

      if (SOV3value) SOV3value = false;
      else SOV3value = true;
      console.log("new SOV3 value = " + SOV3value);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new SOV3 state to ALL clients");
      io.emit("SOV3", SOV3value); //send button status to ALL clients

      if (PUMPvalue) PUMPvalue = false;
      else PUMPvalue = true;
      console.log("new PUMP value = " + PUMPvalue);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new PUMP state to ALL clients");
      io.emit("PUMP", PUMPvalue); //send button status to ALL clients

      if (DRAINvalue) DRAINvalue = false;
      else DRAINvalue = true;
      console.log("new DRAIN value = " + DRAINvalue);
      // LED26.writeSync(GPIO26value); //turn LED on or off
      console.log("Send new DRAIN state to ALL clients");
      io.emit("DRAIN", DRAINvalue); //send button status to ALL clients
    }
    // console.log(draindone);
  });
  setInterval(() => {
    if (temp || level === !0) {
      const tem = (list) => {
        return [...list, { x: new Date(), y: temp }];
      };
      const lev = (list) => {
        return [...list, { x: new Date(), y: level }];
      };
      TempSeries = tem(TempSeries);
      LevelSeries = lev(LevelSeries);
      DataSeries = [
        {
          name: "Temperature",
          data: TempSeries,
        },
        {
          name: "Level",
          data: LevelSeries,
        },
      ];

      io.emit(`data_graph`, DataSeries);
    }
    if (TempSeries.length > 2500 || LevelSeries.length > 2500) {
      TempSeries.shift();
      LevelSeries.shift();
      // var log = DataSeries[0].data;
      // var loglen = Object.keys(log).length;
      // console.log(loglen);
    }
    // console.log(TempSeries.length, LevelSeries.length);

    // console.log(TempSeries);
    // console.log(LevelSeries);
    // console.log(DataSeries);
  }, ADDING_DATA_INTERVAL_IN_MILLISECONDS);

  socket.on(`joined`, (data) => {
    console.log(`user with socket ID: ${socket.id} name: ${data} is joined`);
    socket.emit(`wellcome`, {
      messageData: {
        author: `Admin`,
        message: `Wellcome to chat ${data}`,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      },
    });
  });

  socket.on(`send_message`, (data) => {
    io.emit(`receive_message`, data);
  });

  socket.on(`disconnect`, () => {
    console.log(`User Disconnected`, socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.messege}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
