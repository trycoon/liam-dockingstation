/* eslint-disable class-methods-use-this */
// Implementation of the operations in the OpenAPI-file, "client/swagger/liam-openapi.json".
// Edit and validate the file on https://editor.swagger.io/#
// Generate this file using:
// "npx github:seriousme/fastify-openapi-glue client/swagger/liam-openapi.json"
class Service {
  constructor(options) {
    this.fastify = options.fastify;
    this.store = options.store;
  }

  // Operation: createSession
  // URL: /v1/session
  // summary:  undefined
  // req.body
  //   type: object
  //   properties:
  //     username:
  //       type: string
  //     password:
  //       type: string
  //
  // valid responses
  //   '201':
  //     description: Successfully logged in user
  //   '400':
  //     description: If missing parameters or request is malformed
  //   '401':
  //     description: If login failed due to wrong credentials
  //

  async createSession(req, reply) {
    return { key: 'value' };
  }

  // Operation: getSession
  // URL: /v1/session
  // summary:  undefined
  // valid responses
  //   '200':
  //     description: Active session available
  //   '401':
  //     description: Not logged in
  //

  async getSession(req, reply) {
    return {};
  }

  // Operation: deleteSession
  // URL: /v1/session
  // summary:  undefined
  // valid responses
  //   '200':
  //     description: Session removed
  //   '401':
  //     description: Not logged in
  //

  async deleteSession(req, reply) {
    return { key: 'value' };
  }

  // Operation: getBasicAuth
  // URL: /v1/basic_auth
  // summary:  undefined
  // valid responses
  //   '200':
  //     description: Authentication succeeded
  //   '401':
  //     description: Authentication failed
  //

  async getBasicAuth(req, reply) {
    return {};
  }

  // Operation: generateApiKey
  // URL: /v1/apikey
  // summary:  undefined
  // valid responses
  //   '201':
  //     description: Successfully generated a new API key
  //   '401':
  //     description: If login failed due to wrong credentials
  //

  async generateApiKey(req, reply) {
    return { key: 'value' };
  }

  // Operation: getMowers
  // URL: /v1/mowers
  // summary:  undefined
  // valid responses
  //   '200':
  //     description: Current available mowers
  //     content:
  //       application/json:
  //         schema:
  //           properties:
  //             mowers:
  //               type: array
  //               description: array of mower available
  //               items:
  //                 type: object
  //                 properties:
  //                   id:
  //                     type: string
  //                   name:
  //                     type: string
  //   '401':
  //     description: Not logged in
  //

  async getMowers(req, reply) {
    return {
      mowers: [
        {
          id: 'string',
          name: 'string',
        },
      ],
    };
  }

  // Operation: getStatus
  // URL: /v1/:mowerId/status
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Current status
  //     content:
  //       application/json:
  //         schema:
  //           type: object
  //           properties:
  //             state:
  //               type: string
  //               enum:
  //                 - DOCKED
  //                 - LAUNCHING
  //                 - MOWING
  //                 - DOCKING
  //                 - CHARGING
  //                 - STUCK
  //                 - FLIPPED
  //                 - MANUAL
  //                 - STOP
  //                 - TEST
  //             batteryVoltage:
  //               type: number
  //               format: float
  //             batteryLevel:
  //               type: number
  //               format: float
  //             batteryChargeCurrent:
  //               type: number
  //               format: float
  //             isCharging:
  //               type: boolean
  //             lastFullyChargeTime:
  //               type: integer
  //               format: unit32
  //             lastChargeDuration:
  //               type: integer
  //               format: unit32
  //             radioSignal:
  //               type: integer
  //               format: uint8
  //             cutterLoad:
  //               type: integer
  //               format: uint8
  //             cutterSpeed:
  //               type: integer
  //               format: int16
  //             uptime:
  //               type: integer
  //               format: uint32
  //             leftWheelSpeed:
  //               type: integer
  //               format: int16
  //             rightWheelSpeed:
  //               type: integer
  //               format: int16
  //             pitch:
  //               type: integer
  //               format: int16
  //             roll:
  //               type: integer
  //               format: int16
  //             heading:
  //               type: integer
  //               format: uint16
  //             obstacles:
  //               type: object
  //               description: >-
  //                 distance (in centimeters) to possible obstacles, one reading per
  //                 available sensor
  //               properties:
  //                 left:
  //                   type: integer
  //                   format: uint16
  //                 front:
  //                   type: integer
  //                   format: uint16
  //                 right:
  //                   type: integer
  //                   format: uint16
  //   '401':
  //     description: Not logged in
  //

  async getStatus(req, reply) {
    return {
      state: 'DOCKED',
      batteryVoltage: 0,
      batteryLevel: 0,
      batteryChargeCurrent: 0,
      isCharging: true,
      lastFullyChargeTime: 0,
      lastChargeDuration: 0,
      radioSignal: 0,
      cutterLoad: 0,
      cutterSpeed: 0,
      uptime: 0,
      leftWheelSpeed: 0,
      rightWheelSpeed: 0,
      pitch: 0,
      roll: 0,
      heading: 0,
      obstacles: {
        left: 0,
        front: 0,
        right: 0,
      },
    };
  }

  // Operation: getSystem
  // URL: /v1/:mowerId/system
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Current system information
  //     content:
  //       application/json:
  //         schema:
  //           type: object
  //           properties:
  //             name:
  //               type: string
  //             version:
  //               type: string
  //             mowerId:
  //               type: string
  //             totalHeap:
  //               type: integer
  //               format: uint32
  //             freeHeap:
  //               type: integer
  //               format: uint32
  //             minFreeHeap:
  //               type: integer
  //               format: uint32
  //             getMaxAllocHeap:
  //               type: integer
  //               format: uint32
  //             localTime:
  //               type: string
  //             settings:
  //               type: object
  //               properties:
  //                 batteryFullVoltage:
  //                   type: number
  //                   format: float
  //                 batteryEmptyVoltage:
  //                   type: number
  //                   format: float
  //   '401':
  //     description: Not logged in
  //

  async getSystem(req, reply) {
    return {
      name: 'string',
      version: 'string',
      mowerId: 'string',
      totalHeap: 0,
      freeHeap: 0,
      minFreeHeap: 0,
      getMaxAllocHeap: 0,
      localTime: 'string',
      settings: {
        batteryFullVoltage: 0,
        batteryEmptyVoltage: 0,
      },
    };
  }

  // Operation: setState
  // URL: /v1/:mowerId/state
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.body
  //   type: object
  //   properties:
  //     state:
  //       type: string
  //       enum:
  //         - DOCKED
  //         - LAUNCHING
  //         - MOWING
  //         - DOCKING
  //         - CHARGING
  //         - STUCK
  //         - FLIPPED
  //         - MANUAL
  //         - STOP
  //         - TEST
  //
  // valid responses
  //   '200':
  //     description: Successfully changed to new state
  //   '400':
  //     description: Bad request (missformed JSON)
  //   '401':
  //     description: Not logged in
  //   '422':
  //     description: Unknown state requested
  //

  async setState(req, reply) {
    return {};
  }

  // Operation: getLoglevel
  // URL: /v1/:mowerId/loglevel
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Returns current loglevel
  //     content:
  //       application/json:
  //         schema:
  //           type: object
  //           properties:
  //             level:
  //               type: integer
  //               format: unit8
  //               enum:
  //                 - 0
  //                 - 1
  //                 - 2
  //                 - 3
  //                 - 4
  //                 - 5
  //                 - 6
  //   '401':
  //     description: Not logged in
  //

  async getLoglevel(req, reply) {
    return {
      level: 0,
    };
  }

  // Operation: setLoglevel
  // URL: /v1/:mowerId/loglevel
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.body
  //   type: object
  //   properties:
  //     level:
  //       type: integer
  //       format: unit8
  //       enum:
  //         - 0
  //         - 1
  //         - 2
  //         - 3
  //         - 4
  //         - 5
  //         - 6
  //
  // valid responses
  //   '200':
  //     description: Successfully set loglevel
  //   '401':
  //     description: Not logged in
  //

  async setLoglevel(req, reply) {
    return { key: 'value' };
  }

  // Operation: getLogmessages
  // URL: /v1/:mowerId/logmessages
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.query
  //   type: object
  //   properties:
  //     timeOffset:
  //       type: string
  //       description: >-
  //         ISO-8601 timestamp of last message received, e.g.
  //         "2020-02-25T23:31:00.889Z", will fetch next <count> newer messages after
  //         that. Zero or no parameter will pick from the last messages received.
  //     count:
  //       type: integer
  //       format: uint16
  //       default: 50
  //       description: Number of messages to receive
  //
  // valid responses
  //   '200':
  //     description: Returns log messages within range of 'timeOffset' and 'count'.
  //     content:
  //       application/json:
  //         schema:
  //           type: object
  //           properties:
  //             messages:
  //               type: array
  //               description: log messages
  //               items:
  //                 type: object
  //                   properties:
  //                     level:
  //                       type: string
  //                     message:
  //                       type: string
  //                     time:
  //                       type: string
  //             total:
  //               type: integer
  //               format: uint16
  //   '401':
  //     description: Not logged in
  //

  async getLogmessages(req, reply) {
    try {
      const result = await this.store.getLogMessages(
        req.params.mowerId,
        req.query.timeOffset,
        req.query.count,
      );

      return result;
    } catch (err) {
      //TODO: use logger.error(...)
      console.error(err);
      throw err;
    }
  }

  // Operation: factoryreset
  // URL: /v1/:mowerId/factoryreset
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Successfully factory reset mower
  //   '401':
  //     description: Not logged in
  //

  async factoryreset(req, reply) {
    return { key: 'value' };
  }

  // Operation: reboot
  // URL: /v1/:mowerId/reboot
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Successfully begun rebooting mower
  //   '401':
  //     description: Not logged in
  //

  async reboot(req, reply) {
    return { key: 'value' };
  }

  // Operation: manualForward
  // URL: /v1/:mowerId/manual/forward
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.body
  //   type: object
  //   properties:
  //     speed:
  //       type: integer
  //       format: int8
  //       description: 0-100%
  //     turnrate:
  //       type: integer
  //       format: int8
  //       description: '-1=>-100 left, 1=>100 right. 0 = don''t turn.'
  //     smooth:
  //       type: boolean
  //       description: smoothly take us to target speed
  //
  // valid responses
  //   '200':
  //     description: Successfully set mower to forward motion
  //   '401':
  //     description: Not logged in
  //

  async manualForward(req, reply) {
    return { key: 'value' };
  }

  // Operation: manualBackward
  // URL: /v1/:mowerId/manual/backward
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.body
  //   type: object
  //   properties:
  //     speed:
  //       type: integer
  //       format: int8
  //       description: 0-100%
  //     turnrate:
  //       type: integer
  //       format: int8
  //       description: '-1=>-100 left, 1=>100 right. 0 = don''t turn.'
  //     smooth:
  //       type: boolean
  //       description: smoothly take us to target speed
  //
  // valid responses
  //   '200':
  //     description: Successfully set mower to backward motion
  //   '401':
  //     description: Not logged in
  //

  async manualBackward(req, reply) {
    return { key: 'value' };
  }

  // Operation: manualStop
  // URL: /v1/:mowerId/manual/stop
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Successfully stopped mower
  //   '401':
  //     description: Not logged in
  //

  async manualStop(req, reply) {
    return { key: 'value' };
  }

  // Operation: manualStartCutter
  // URL: /v1/:mowerId/manual/cutter_on
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Successfully started cutter
  //   '401':
  //     description: Not logged in
  //

  async manualStartCutter(req, reply) {
    return { key: 'value' };
  }

  // Operation: manualStopCutter
  // URL: /v1/:mowerId/manual/cutter_off
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: Successfully stopped cutter
  //   '401':
  //     description: Not logged in
  //

  async manualStopCutter(req, reply) {
    return { key: 'value' };
  }

  // Operation: getBatteryHistory
  // URL: /v1/:mowerId/history/batteryVoltage
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.query
  //   type: object
  //   properties:
  //     timeOffset:
  //       type: string
  //       description: >-
  //         The timestamp to receive entries after, e.g. "2020-02-25T23:31:00.889Z".
  //         If not specified then you get the last 30 minutes.
  //     count:
  //       type: integer
  //       description: The numbers of items to return.
  //
  // valid responses
  //   '200':
  //     description: Battery level history
  //     content:
  //       application/json:
  //         schema:
  //           type: array
  //           items:
  //             type: object
  //             properties:
  //               time:
  //                 type: string
  //               voltage:
  //                 type: number
  //   '401':
  //     description: Not logged in
  //

  async getBatteryHistory(req, reply) {
    try {
      const result = await this.store.getBatteryVoltage(
        req.params.mowerId,
        req.query.timeOffset,
        req.query.count,
      );

      return result;
    } catch (err) {
      //TODO: use logger.error(...)
      console.error(err);
      throw err;
    }
  }

  // Operation: getChargeCurrent
  // URL: /v1/:mowerId/history/chargeCurrent
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.query
  //   type: object
  //   properties:
  //     timeOffset:
  //       type: string
  //       description: >-
  //         The timestamp to receive entries after, e.g. "2020-02-25T23:31:00.889Z".
  //         If not specified then you get the last 30 minutes.
  //     count:
  //       type: integer
  //       description: The numbers of items to return.
  //
  // valid responses
  //   '200':
  //     description: Charge current history
  //     content:
  //       application/json:
  //         schema:
  //           type: array
  //           items:
  //             type: object
  //             properties:
  //               time:
  //                 type: string
  //               current:
  //                 type: number
  //   '401':
  //     description: Not logged in
  //

  async getChargeCurrent(req, reply) {
    try {
      const result = await this.store.getBatteryChargeCurrent(
        req.params.mowerId,
        req.query.timeOffset,
        req.query.count,
      );

      return result;
    } catch (err) {
      //TODO: use logger.error(...)
      console.error(err);
      throw err;
    }
  }

  // Operation: getCutterLoad
  // URL: /v1/:mowerId/history/cutterLoad
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.query
  //   type: object
  //   properties:
  //     timeOffset:
  //       type: string
  //       description: >-
  //         The timestamp to receive entries after, e.g. "2020-02-25T23:31:00.889Z".
  //         If not specified then you get the last 30 minutes.
  //     count:
  //       type: integer
  //       description: The numbers of items to return.
  //
  // valid responses
  //   '200':
  //     description: Cutter load history
  //     content:
  //       application/json:
  //         schema:
  //           type: array
  //           items:
  //             type: object
  //             properties:
  //               time:
  //                 type: string
  //               load:
  //                 type: number
  //   '401':
  //     description: Not logged in
  //

  async getCutterLoad(req, reply) {
    try {
      const result = await this.store.getCutterLoad(
        req.params.mowerId,
        req.query.timeOffset,
        req.query.count,
      );

      return result;
    } catch (err) {
      //TODO: use logger.error(...)
      console.error(err);
      throw err;
    }
  }

  // Operation: getPositionHistory
  // URL: /v1/:mowerId/history/position
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.query
  //   type: object
  //   properties:
  //     timeOffset:
  //       type: string
  //       description: >-
  //         The timestamp to receive entries after, e.g. "2020-02-25T23:31:00.889Z".
  //         If not specified then you get the last 30 minutes.
  //     count:
  //       type: integer
  //       description: The numbers of items to return.
  //
  // valid responses
  //   '200':
  //     description: GNSS-position history
  //     content:
  //       application/json:
  //         schema:
  //           type: array
  //           items:
  //             type: object
  //             properties:
  //               lat:
  //                 type: number
  //                 format: double
  //                 description: GNSS-latitude
  //               lng:
  //                 type: number
  //                 format: double
  //                 description: GNSS-longitude
  //               pitch:
  //                 type: integer
  //                 format: int16
  //               roll:
  //                 type: integer
  //                 format: int16
  //               heading:
  //                 type: integer
  //                 format: uint16
  //   '401':
  //     description: Not logged in
  //

  async getPositionHistory(req, reply) {
    try {
      const result = await this.store.getPosition(
        req.params.mowerId,
        req.query.timeOffset,
        req.query.count,
      );

      return result;
    } catch (err) {
      //TODO: use logger.error(...)
      console.error(err);
      throw err;
    }
  }

  // Operation: createScheduleEntry
  // URL: /v1/:mowerId/schedules
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.body
  //   properties:
  //     activeWeekdays:
  //       type: array
  //       description: >-
  //         Array of weekdays (starting with monday, tuesday...). True means mowing
  //         should be conducted this day of the week.
  //       items:
  //         type: boolean
  //       minItems: 7
  //       maxItems: 7
  //     startTime:
  //       type: string
  //       description: >-
  //         Time when mowing should begin. In the format "HH:MM", and we use a 24
  //         hours notation.
  //     stopTime:
  //       type: string
  //       description: >-
  //         Time when mowing should end. In the format "HH:MM", and we use a 24 hours
  //         notation.
  //
  // valid responses
  //   '201':
  //     description: Successfully added schedule
  //   '400':
  //     description: If missing parameters or request is malformed
  //   '401':
  //     description: Not logged in
  //

  async createScheduleEntry(req, reply) {
    return { key: 'value' };
  }

  // Operation: getSchedules
  // URL: /v1/:mowerId/schedules
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // valid responses
  //   '200':
  //     description: List of schedule entries
  //     content:
  //       application/json:
  //         schema:
  //           type: array
  //           items:
  //             type: object
  //             properties:
  //               activeWeekdays:
  //                 type: array
  //                 description: >-
  //                   Array of weekdays (starting with monday, tuesday...). True means
  //                   mowing should be conducted this day of the week.
  //                 items:
  //                   type: boolean
  //                 minItems: 7
  //                 maxItems: 7
  //               startTime:
  //                 type: string
  //                 description: >-
  //                   Time when mowing should begin. In the format "HH:MM", and we use
  //                   a 24 hours notation.
  //               stopTime:
  //                 type: string
  //                 description: >-
  //                   Time when mowing should end. In the format "HH:MM", and we use a
  //                   24 hours notation.
  //   '401':
  //     description: Not logged in
  //

  async getSchedules(req, reply) {
    return [
      {
        activeWeekdays: [true],
        startTime: 'string',
        stopTime: 'string',
      },
    ];
  }

  // Operation: deleteScheduleEntry
  // URL: /v1/:mowerId/schedules/:position
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //     position:
  //       type: integer
  //       description: Position in list (starting with 0)
  //   required:
  //     - mowerId
  //     - position
  //
  // valid responses
  //   '200':
  //     description: Schedule entry removed
  //   '401':
  //     description: Not logged in
  //

  async deleteScheduleEntry(req, reply) {
    return { key: 'value' };
  }

  // Operation: createPerimeter
  // URL: /v1/:mowerId/perimeters
  // summary:  undefined
  // req.params
  //   type: object
  //   properties:
  //     mowerId:
  //       type: string
  //       description: mower id
  //   required:
  //     - mowerId
  //
  // req.body
  //   type: array
  //   items:
  //     type: object
  //     properties:
  //       outerPerimeter:
  //         type: object
  //         properties:
  //           lat:
  //             type: array
  //             items:
  //               type: number
  //               format: double
  //               description: GNSS-latitude
  //           lng:
  //             type: array
  //             items:
  //               type: number
  //               format: double
  //               description: GNSS-longitude
  //       perimeters:
  //         type: array
  //         items:
  //           type: object
  //           properties:
  //             name:
  //               type: string
  //             lat:
  //               type: array
  //               items:
  //                 type: number
  //                 format: double
  //                 description: GNSS-latitude
  //             lng:
  //               type: array
  //               items:
  //                 type: number
  //                 format: double
  //                 description: GNSS-longitude
  //
  // valid responses
  //   '201':
  //     description: Successfully added perimeter
  //   '400':
  //     description: If missing parameters or request is malformed
  //   '401':
  //     description: Not logged in
  //

  async createPerimeter(req, reply) {
    return { key: 'value' };
  }
}

// https://ponyfoo.com/articles/binding-methods-to-class-instance-objects
// Bind all methods to the class to get the same "this".
function selfish(target) {
  const cache = new WeakMap();
  const handler = {
    // eslint-disable-next-line no-shadow
    get(target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    },
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

module.exports = opts => selfish(new Service(opts));
