<img src="frontend\src\assets\images\logo.png" width="360" height="260">

# PI_IOT_PROJECT

Full stack web app for raspberry pi to control GPIO and Realtime monitoring of industrial process on internet.

You can monitor realtime data of simple industrial process includes valves, heater, pump, agitator feedback,
temperature and level and.

control process include solinoid valves, heater, agitator, pump.

Which is hardwired to an raspberry pi Gpio's

And raspberrypi_client.js client script running on it as raspberry pi boots up it connect to server and communicate with it and send Temperature and level realtime data and
recives data to actuate solinoid valves, pump, heater and agitator.

In server you can observe temperature, level and valves, pump, heater, agitator feedback in realtime in intractive way.

## Stack Used

![Stack used](https://img.shields.io/badge/STACK-MERN-brightgreen.svg)

## Backend Dependencies

![Node](https://img.shields.io/badge/Node-V14.17.6-important.svg)
![Express](https://img.shields.io/badge/Express-V^4.17.2-important.svg)
![Mongodb](https://img.shields.io/badge/Mongodb-V5.0.7-important.svg)
![cors](https://img.shields.io/badge/Cors-V^2.8.5-important.svg)
![dot env](https://img.shields.io/badge/Dotenv-V^16.0.0-informational.svg)
![bcrpt](https://img.shields.io/badge/Bcrypt-V^2.4.3-informational.svg)
![body parser](https://img.shields.io/badge/Body_parser-V^1.19.1-informational.svg)
![cloudinary](https://img.shields.io/badge/Cloudinary-V^1.28.1-informational.svg)
![cookie parser](https://img.shields.io/badge/Cookie_parser-V^1.4.6-informational.svg)
![fileupload](https://img.shields.io/badge/Express_fileupload-V^1.3.1-informational.svg)
![googleapis](https://img.shields.io/badge/Googleapis-V^93.0.0-informational.svg)
![jsonwebtoken](https://img.shields.io/badge/Json_web_token-V^8.5.1-informational.svg)
![mongoose](https://img.shields.io/badge/Mongoose-V^6.2.0-informational.svg)
![nodemailer](https://img.shields.io/badge/Nodemailer-V^6.7.2-informational.svg)
![socket.io](https://img.shields.io/badge/Socket.io-V^4.4.1-informational.svg)
![validator](https://img.shields.io/badge/Validator-V^13.7.0-informational.svg)

## Frontend Dependencies

![react](https://img.shields.io/badge/React-V^17.0.2-important.svg)
![react-dom](https://img.shields.io/badge/React_dom-V^17.0.2-important.svg)
![react-router-dom](https://img.shields.io/badge/React_router_dom-V^5.2.0-important.svg)
![react-redux](https://img.shields.io/badge/React_redux-V^7.2.6-informational.svg)
![React-alert](https://img.shields.io/badge/React_alert-V^7.0.3-informational.svg)
![React-alert-template](https://img.shields.io/badge/React_alert_template_basic-V^1.0.2-informational.svg)
![React-apexcharts](https://img.shields.io/badge/React_apexcharts-V^1.3.9-informational.svg)
![React-circular-progressbar](https://img.shields.io/badge/React_circular_progressbar-V^2.0.4-informational.svg)
![React-scroll-to-bottom](https://img.shields.io/badge/React_scroll_to_bottom-V^4.2.0-informational.svg)
![redux](https://img.shields.io/badge/Redux-V^4.1.2-informational.svg)
![redux-devtools](https://img.shields.io/badge/Redux_devtools_extension-V^2.13.9-informational.svg)
![redux-thunk](https://img.shields.io/badge/Redux_thunk-V^2.4.1-informational.svg)
![axios](https://img.shields.io/badge/Axios-V^0.25.0-informational.svg)
![apexcharts](https://img.shields.io/badge/Apexcharts-V^3.33.1-informational.svg)
![socket.io-client](https://img.shields.io/badge/Socket.io_client-V^4.4.1-informational.svg)
![webfontloader](https://img.shields.io/badge/Web_font_loader-V^1.6.28-informational.svg)

## Raspberry Pi Client Dependencies

![Node](https://img.shields.io/badge/Node-V14.17.6-important.svg)
![Pigpio](https://img.shields.io/badge/Pigpio-V14.17.6-important.svg)
![Mcp-spi-adc](https://img.shields.io/badge/Mcp_spi_adc-V14.17.6-important.svg)
![socket.io-client](https://img.shields.io/badge/Socket.io_client-V14.17.6-important.svg)

## License

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

## Quick Start

Download the zip from Github

or

Clone the repo:

`git clone https://github.com/Ash786Sharma/PI_IOT_PROJECT.git `

### Starting Backend:

Change directory: `cd PI_IOT_PROJECT`

Install with npm: `npm install`

Install with yarn: `yarn add`

Before starting backend you need to read and edit config.md

`cd PI_IOT_PROJECT/backend/config/config.md`

To configure or setup your mongodb database, cloudinary, email service, jwt token, oauth, cookie etc.

And rename and save it to

config.env

Then

Start backend with nodemon: `npm run dev`

Start backend with node: `npm start`

### Starting Frontend:

Change directory: `cd PI_IOT_PROJECT/frontend`

Install with npm: `npm install`

Install with yarn: `yarn add`

Then

Start Frontend: `npm start`

### Starting Raspberry pi Client:

Copy or move raspberrypi_client folder from PI_IOT_PROJECT folder

To your Raspberry pi os Desktop then

Change directory on Raspberry pi: `cd Desktop/raspberrypi_client`

Install with npm: `npm install`

Install with yarn: `yarn add`

Start raspberrypi_client with nodemon: `npm run dev`

Start raspberrypi_client with node: `npm start`

#### Enjoy!!!

## ScreenShot's and Photo's

<img src="frontend\src\assets\images\Screenshot 1.png" width="360" height="260">
<img src="frontend\src\assets\images\Screenshot 2.png" width="360" height="260">
<img src="frontend\src\assets\images\Screenshot 3.png" width="360" height="260">
<img src="frontend\src\assets\images\Screenshot 4.png" width="360" height="260">
<img src="frontend\src\assets\images\Screenshot 5.png" width="360" height="260">
<img src="frontend\src\assets\images\Screenshot 6.png" width="360" height="260">

### Raspberry pi temperature and level sensor, valve, heater, agitator, pump wiring:

Components used:

Raspberry pi 3B.

<img src="frontend\src\assets\images\Raspberrypi 3b.png" width="360" height="260">
<img src="frontend\src\assets\images\Raspberrypi pinout.png" width="360" height="260">

LM36 Temperature sensor.

<img src="frontend\src\assets\images\lm36.png" width="360" height="260">
<img src="frontend\src\assets\images\lm36pinout.png" width="360" height="260">

HC-SR04 Utrasonic sensor for level.

<img src="frontend\src\assets\images\ultrasonic.png" width="360" height="260">
<img src="frontend\src\assets\images\ultrasonicpinout.png" width="360" height="260">

Mcp3008 Adc Ic for analog to digital conversion of temprature signal.

<img src="frontend\src\assets\images\mcp3008.png" width="360" height="260">
<img src="frontend\src\assets\images\mcp3008pinout.png" width="360" height="260">

4 X Sov valves

<img src="frontend\src\assets\images\sov.png" width="360" height="260">

Dc motor for agitator

<img src="frontend\src\assets\images\agitator.png" width="360" height="260">

Dc pump 12v

<img src="frontend\src\assets\images\pump.png" width="360" height="260">

2 X Heater

<img src="frontend\src\assets\images\heater.png" width="360" height="260">

Connect the valves and other on given GPIO of Raspberry pi:

Temperature:

SPI0.0

GPIO 10 (SPI0 MOSI)

GPIO 9 (SPI0 MISO)

GPIO 11 (SPI0 SCLK)

GPIO 8 (SPI0 CE0)

Ultrasonic Level:

GPIO 23 ( trig output)

GPIO 24 ( echo input)

PUMP:

GPIO 4 (output)

AGITATOR:

GPIO 17 (output)

HEATER1:

GPIO 27 (output)

HEATER2:

GPIO 22 (output)

SOV1:

GPIO 5 (output)

SOV2:

GPIO 6 (output)

SOv3:

GPIO 13 (output)

SOV4:

GPIO 19 (output)

Connect lm36 to mcp3008 Ic and mcp3008 to raspberry pi as shown below:

<img src="frontend\src\assets\images\raspberrypi 1.png" width="360" height="260">
<img src="frontend\src\assets\images\raspberrypi 2.png" width="360" height="260">

Now connect HC-RS04 utrasonic sensor to raspberry pi as shown below:

<img src="frontend\src\assets\images\raspberrypi 3.png" width="360" height="260">

### Happy prototyping!!!

## Authors

- [@AshwaniSharma](https://github.com/Ash786Sharma)
