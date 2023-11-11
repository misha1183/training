const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const utils = require('zigbee-herdsman-converters/lib/utils');
const ota = require('zigbee-herdsman-converters/lib/ota');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const e = exposes.presets;
const ea = exposes.access;
const globalStore = require('zigbee-herdsman-converters/lib/store');
const definition = {
    fingerprint: [{modelID: 'TS0002', manufacturerName: '_TZ3000_lmlsduws'}],
    model: 'MINI-Z1-2CH',
    vendor: 'TuYa',
    description: '2 gang switch',
    toZigbee: [tz.on_off, tuya.tz.power_on_behavior_1],
    fromZigbee: [tz.on_off, tuya.tz.power_on_behavior_1],
    extend:  tuya.extend.switch({switch_type: true, endpoints: ['l1', 'l2']}),
    whiteLabel: [{vendor: 'Mini-Z1', model: 'MINI-Z1-2CH'}],
    endpoint: (device) => {
        return {l1: 1, l2: 2};
        },
    meta: {multiEndpoint: true},
    configure: async (device, coordinatorEndpoint, logger) => {
            await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
        },
};

module.exports = definition;
