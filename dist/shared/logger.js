"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.errorlogger = void 0;
/* eslint-disable no-undef */
const winston_1 = require("winston");
const { combine, timestamp, label, printf } = winston_1.format;
//Customm Log Format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hour}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'CRS' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        // new DailyRotateFile({
        //   filename: path.join(
        //     process.cwd(),
        //     'logs',
        //     'winston',
        //     'successes',
        //     'phu-%DATE%-success.log'
        //   ),
        //   datePattern: 'YYYY-DD-MM-HH',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
    ],
});
exports.logger = logger;
const errorlogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'CRS' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        // new DailyRotateFile({
        //   filename: path.join(
        //     process.cwd(),
        //     'logs',
        //     'winston',
        //     'errors',
        //     'phu-%DATE%-error.log'
        //   ),
        //   datePattern: 'YYYY-DD-MM-HH',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
    ],
});
exports.errorlogger = errorlogger;
