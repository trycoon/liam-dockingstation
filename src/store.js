const Influx = require('influx');
const { Client } = require('@elastic/elasticsearch');

const parseISO = require('date-fns/parseISO');
const formatRFC3339 = require('date-fns/formatRFC3339');

const DB_NAME = 'liam';
const DB_SCHEMA = require('./influx-schema.js');

let influx;
let elastic;

async function init() {
  influx = new Influx.InfluxDB({
    host: 'localhost',
    database: DB_NAME,
    schema: DB_SCHEMA,
    username: 'influx_user',
    password: 'influx_pwd',
  });

  const dbNames = await influx.getDatabaseNames();

  if (!dbNames.includes(DB_NAME)) {
    await influx.createDatabase(DB_NAME);
  }

  elastic = new Client({ node: 'http://localhost:9200' });
}

async function storeBattertyVoltage(mowerId, voltage) {
  return influx.writePoints([
    {
      measurement: 'batteryVoltage',
      tags: { mower: mowerId },
      fields: { voltage },
    },
  ]);
}

async function getBatteryVoltage(mowerId, timeOffset, count = 50) {
  const time = formatRFC3339(timeOffset ? parseISO(timeOffset) : new Date());
  return influx.query(`
                    select time,voltage from batteryVoltage
                    where mower=${Influx.escape.stringLit(mowerId)}
                    and time < ${Influx.escape.stringLit(time)}                 
                    order by time desc
                    limit ${count}
                  `);
}

async function storeBattertyChargeCurrent(mowerId, current) {
  return influx.writePoints([
    {
      measurement: 'batteryChargeCurrent',
      tags: { mower: mowerId },
      fields: { current },
    },
  ]);
}

async function getBatteryChargeCurrent(mowerId, timeOffset, count = 50) {
  const time = formatRFC3339(timeOffset ? parseISO(timeOffset) : new Date());
  return influx.query(`
                    select time,current from batteryChargeCurrent
                    where mower=${Influx.escape.stringLit(mowerId)}
                    and time < ${Influx.escape.stringLit(time)}                 
                    order by time desc
                    limit ${count}
                  `);
}

async function storeCutterLoad(mowerId, load) {
  return influx.writePoints([
    {
      measurement: 'cutterLoad',
      tags: { mower: mowerId },
      fields: { load },
    },
  ]);
}

async function getCutterLoad(mowerId, timeOffset, count = 50) {
  const time = formatRFC3339(timeOffset ? parseISO(timeOffset) : new Date());
  return influx.query(`
                    select time,load from cutterLoad
                    where mower=${Influx.escape.stringLit(mowerId)}
                    and time < ${Influx.escape.stringLit(time)}                 
                    order by time desc
                    limit ${count}
                  `);
}

async function storeWifiSignal(mowerId, dbm) {
  return influx.writePoints([
    {
      measurement: 'wifiSignal',
      tags: { mower: mowerId },
      fields: { dbm },
    },
  ]);
}

async function getWifiSignal(timeOffset, count = 50) {
  //TODO: scan every 5 minutes using https://www.npmjs.com/package/node-wifi, and store to Influx
  const time = formatRFC3339(timeOffset ? parseISO(timeOffset) : new Date());
  return influx.query(`
                    select time,dbm from wifiSignal
                    and time < ${Influx.escape.stringLit(time)}                 
                    order by time desc
                    limit ${count}
                  `);
}

async function storeRadioSignal(mowerId, dbm) {
  return influx.writePoints([
    {
      measurement: 'radioSignal',
      tags: { mower: mowerId },
      fields: { dbm },
    },
  ]);
}

async function getRadioSignal(mowerId, timeOffset, count = 50) {
  const time = formatRFC3339(timeOffset ? parseISO(timeOffset) : new Date());
  return influx.query(`
                    select time,dbm from radioSignal
                    where mower=${Influx.escape.stringLit(mowerId)}
                    and time < ${Influx.escape.stringLit(time)}                 
                    order by time desc
                    limit ${count}
                  `);
}

async function storePosition(mowerId, position) {
  return influx.writePoints([
    {
      measurement: 'position',
      tags: { mower: mowerId },
      fields: {
        lat: position.lat,
        lng: position.lng,
        pitch: position.pitch,
        roll: position.roll,
        heading: position.heading,
      },
    },
  ]);
}

async function getPosition(mowerId, timeOffset, count = 50) {
  const time = formatRFC3339(timeOffset ? parseISO(timeOffset) : new Date());
  return influx.query(`
                    select time,lat,lng,pitch,roll,heading from position
                    where mower=${Influx.escape.stringLit(mowerId)}
                    and time < ${Influx.escape.stringLit(time)}                 
                    order by time desc
                    limit ${count}
                  `);
}

async function getLogMessages(mowerId, timeOffset, count = 50) {
  const time = formatRFC3339(timeOffset ? parseISO(timeOffset) : new Date());
  const { body } = await elastic.search({
    index: 'liam',
    size: count,
    body: {
      _source: ['@timestamp', 'message', 'log.level'],
      query: {
        bool: {
          must: [
            {
              match_phrase: {
                'pino.mower': {
                  query: mowerId,
                },
              },
            },
            {
              range: {
                '@timestamp': {
                  format: 'strict_date_optional_time',
                  lte: time,
                },
              },
            },
          ],
        },
      },
      sort: [{ '@timestamp': 'desc' }],
    },
  });

  return {
    messages: body.hits.hits.map(msg => {
      return {
        // eslint-disable-next-line dot-notation
        time: msg['_source']['@timestamp'],
        // eslint-disable-next-line dot-notation
        level: msg['_source'].log.level,
        // eslint-disable-next-line dot-notation
        message: msg['_source'].message,
      };
    }),
    total: body.hits.total.value,
  };
}

module.exports = {
  init,
  storeBattertyVoltage,
  getBatteryVoltage,
  storeBattertyChargeCurrent,
  getBatteryChargeCurrent,
  storeCutterLoad,
  getCutterLoad,
  storeWifiSignal,
  getWifiSignal,
  storeRadioSignal,
  getRadioSignal,
  storePosition,
  getPosition,
  getLogMessages,
};
