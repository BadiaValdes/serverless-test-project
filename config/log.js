'use strict';

const constants = require('./constant')

module.exports = class Logs {
    static writeLog(e){
        console.log(e);
    }

    static bunyanWriteLog(logInstance, level, message, extraInfo){
        logInstance[level](message, extraInfo);
    }
}

