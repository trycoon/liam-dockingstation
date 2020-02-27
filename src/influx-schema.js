const Influx = require('influx');

module.exports = [
  {
    measurement: 'batteryVoltage',
    fields: {
      voltage: Influx.FieldType.FLOAT,
    },
    tags: ['mower'],
  },
  {
    measurement: 'batteryChargeCurrent',
    fields: {
      current: Influx.FieldType.FLOAT,
    },
    tags: ['mower'],
  },
  {
    measurement: 'cutterLoad',
    fields: {
      load: Influx.FieldType.FLOAT,
    },
    tags: ['mower'],
  },
  {
    measurement: 'wifiSignal',
    fields: {
      dbm: Influx.FieldType.FLOAT,
    },
    tags: ['dockingstation'],
  },
  {
    measurement: 'radioSignal',
    fields: {
      dbm: Influx.FieldType.FLOAT,
    },
    tags: ['mower'],
  },
  {
    measurement: 'position',
    fields: {
      lat: Influx.FieldType.FLOAT,
      lng: Influx.FieldType.FLOAT,
      pitch: Influx.FieldType.FLOAT,
      roll: Influx.FieldType.FLOAT,
      heading: Influx.FieldType.FLOAT,
    },
    tags: ['mower'],
  },
];
