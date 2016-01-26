"use strict";

let mountvol = require('./mountvol');

let discoid = {
    list: function() {
        let isWin = /^win/.test(process.platform);

        if (isWin) return mountvol();
        return Promise.resolve([])
    }
};

module.exports = Object.create(discoid);
