const dotenv = require("dotenv");
const socketIO = require("socket.io-client");
const Gpio = require("pigpio").Gpio;
const mcpadc = require("mcp-spi-adc");
dotenv.config({ path: "raspberrypi_client/config/config.env" });
const trigger = new Gpio(23, { mode: Gpio.OUTPUT });
const echo = new Gpio(24, { mode: Gpio.INPUT, alert: true });
const pump = new Gpio(4, { mode: Gpio.OUTPUT });
const agitator = new Gpio(17, { mode: Gpio.OUTPUT });
const heater1 = new Gpio(27, { mode: Gpio.OUTPUT });
const heater2 = new Gpio(22, { mode: Gpio.OUTPUT });
const sov1 = new Gpio(5, { mode: Gpio.OUTPUT });
const sov2 = new Gpio(6, { mode: Gpio.OUTPUT });
const sov3 = new Gpio(13, { mode: Gpio.OUTPUT });
const sov4 = new Gpio(19, { mode: Gpio.OUTPUT });
const MICROSECDONDS_PER_CM = 1e6 / 34321;
const ENDPOINT = process.env.SERVER_ENDPOINT;
let socket;
var levelValue;
var sensorInput;
var temp;
// var far

const client = () => {
  trigger.digitalWrite(0); // Make sure trigger is low
  socket = socketIO(ENDPOINT, { transports: [`websocket`] });
  console.log("client started");

  socket.on("connect", () => {
    console.log(
      `client connected to server at ${ENDPOINT} with socket id: ${socket.id}`
    );
  });
  socket.on("PUMP", (data) => {
    console.log("PUMP function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var pu = data === true ? 1 : 0;
    pump.digitalWrite(pu);
    console.log("PUMP: " + data.toString());
  });
  socket.on("AGITATOR", (data) => {
    console.log("AGITATOR function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var ag = data === true ? 1 : 0;
    agitator.digitalWrite(ag);
    console.log("AGITATOR: " + data.toString());
  });
  socket.on("HEATER1", (data) => {
    console.log("HEATER function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var h1 = data === true ? 1 : 0;
    heater1.digitalWrite(h1);
    console.log("HEATER: " + data.toString());
  });
  socket.on("HEATER2", (data) => {
    console.log("HEATER2 function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var h2 = data === true ? 1 : 0;
    heater2.digitalWrite(h2);
    console.log("HEATER2: " + data.toString());
  });
  socket.on("SOV1", (data) => {
    console.log("SOV1 function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var sv1 = data === true ? 1 : 0;
    sov1.digitalWrite(sv1);
    console.log("SOV1: " + data.toString());
  });
  socket.on("SOV2", (data) => {
    console.log("SOV2 function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var sv2 = data === true ? 1 : 0;
    sov2.digitalWrite(sv2);
    console.log("SOV2: " + data.toString());
  });
  socket.on("SOV3", (data) => {
    console.log("SOV3 function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var sv3 = data === true ? 1 : 0;
    sov3.digitalWrite(sv3);
    console.log("SOV3: " + data.toString());
  });
  socket.on("SOV4", (data) => {
    console.log("SOV4 function called");
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var sv4 = data === true ? 1 : 0;
    sov4.digitalWrite(sv4);
    console.log("SOV4: " + data.toString());
  });

  // socket.on("FILL", (data) => {
  //   console.log("FILL function called");
  //   console.log(data);
  //   var myJSON = JSON.stringify(data);
  //   console.log(myJSON);

  //   console.log("FILL: " + data.toString());
  // });
  // socket.on("DRAIN", (data) => {
  //   console.log("DRAIN function called");
  //   console.log(data);
  //   var myJSON = JSON.stringify(data);
  //   console.log(myJSON);

  //   console.log("DRAIN: " + data.toString());
  // });
  // socket.on("HEAT", (data) => {
  //   console.log("HEAT function called");
  //   console.log(data);
  //   var myJSON = JSON.stringify(data);
  //   console.log(myJSON);

  //   console.log("HEAT: " + data.toString());
  // });

  const tempSensor = mcpadc.open(0, { speedHz: 20000 }, (err) => {
    if (err) throw err;

    setInterval((_) => {
      tempSensor.read((err, reading) => {
        if (err) throw err;
        sensorInput = reading.rawValue;
        // console.log(sensorInput);
        temp = sensorInput / 1024;
        // console.log(temp)
        temp = temp * 3.3;
        // console.log(temp)
        temp = temp * 100;
        console.log(process.env.SERVER_ENDPOINT);
        console.log(`temperature: ${temp} Deg Celcius`);
        socket.emit(`temperature`, temp);
        // far = (((temp * 9.0)/5.0)+ 32.0)
        // console.log(far);
      });
    }, 1000);
  });

  const watchHCSR04 = () => {
    let startTick;

    echo.on("alert", (level, tick) => {
      if (level == 1) {
        startTick = tick;
      } else {
        const endTick = tick;
        const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
        var distance = diff / 2 / MICROSECDONDS_PER_CM;
        levelValue = calRange(distance, 0.0, 23.0, 0.0, 100.0);
        console.log(`Level: ${distance} Cm & level in: ${levelValue}%`);
        socket.emit(`level`, levelValue);
      }
    });
  };

  const calRange = (input, inStart, inEnd, outStart, outEnd) => {
    var output =
      outStart + ((outEnd - outStart) / (inEnd - inStart)) * (input - inStart);
    var limitOutput = Math.min(Math.max(output, outStart), outEnd);
    limitOutput = outEnd - limitOutput;
    return limitOutput;
    // console.log(output);
    // console.log(limitOutput);
  };

  watchHCSR04();

  // Trigger a distance measurement once per second
  setInterval(() => {
    trigger.trigger(10, 1); // Set trigger high for 10 microseconds
  }, 1000);
};

client();
