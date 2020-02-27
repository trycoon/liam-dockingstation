# Liam docking station

[![license](https://img.shields.io/github/license/trycoon/liam-dockingstationesp.svg?maxAge=3600)](https://opensource.org/licenses/MIT)

## Introduction

Software for controlling a home built robotic lawn mower.
The concept and basic ideas are sprung from the ["Liam lawn mower"](https://github.com/sm6yvr/liam) and [ArduMower](https://www.ardumower.de/index.php/en/) projects, but instead of using an Arduino for controlling the mower this project makes use of the more powerful Espressif ESP32 microcontroller. The reasoning behind this decision is the wish for WiFi connectivity and interconnectivity with existing home automation systems on the market.

Here are some of the features of this project:

- Automatic mowing of lawn using a two wheeled robot.
- GNSS-RTK navigation support, for accurate mowing and path planning.
- WiFi connected (can operate when signal is weak/lost, will reconnect when signal is available).
- Easy to use [REST-based API](documentation/api.md), self explaining (HATEOAS compatible), with Swagger support.
- Monitor mower using [MQTT protocol](documentation/api.md) (works with most Home automation systems).
- Realtime monitoring using Websocket.
- NTP time support, making scheduling of mowing a breeze.
- Obstacle avoidance using ultrasound transducers.
- Support accelerometer, gyroscope, and e-compass to keep mower on a straight line, and detect if mower has flipped over (safety reasons).
- Integrated Web UI for controlling and monitoring mower, see [demo site](http://liam.smart-home.rocks/). (username: admin, password: liam)

## Build software

The Web UI is used for controlling and monitoring your mower, it's also used to setup and configure the mower for the first time use.
The user interface is a single-page web application that is served from a web server on the mower, the web UI communicates with the mower using its public available REST-API. To preserve precious memory the Web UI is stored in a separate part of the Flash memory called the SPIFFS-memory. To build a memory image and upload it to SPIFFS a few other build steps needs to be run in Platform.io. Also to keep the size of the Web UI to a minimum it is "minified" and the different files are bundled together to form just a few, to do this we use common used web developer tools based upon the [Node.js](https://nodejs.org/en/) environment. Soo to build the Web UI first make sure you have Node.js installed!

Enter the "web"-directory of this application and then run the following in the terminal:

```
  npm install
  npm run build
```

install Docker
start required dependencies (like InfluxDB) by running:

```
  docker-compose up
```

## Debugging and faultfinding

[See debugging section](documentation/debugging.md)

## License & Author

- Author: Henrik Östman

```
MIT License

Copyright (c) 2017 Henrik Östman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
```
