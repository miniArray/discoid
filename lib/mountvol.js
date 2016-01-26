"use strict";

let Promise = require('bluebird');
let _ = require('lodash');

/**
 * Initializes the mountvol constructor.
 * @constructor
 * @param {string} listing - Provive command results manually (ex: testing)
 */
let mountvol = function(listing) {
    let results;

    if (!listing)
        return exec().then(parse);

    results = parse(listing);
    return Promise.resolve(results);
};

module.exports = mountvol;

/**
 * Execute the mountvol application.
 * @constructor
 */
let exec = function() {
    let exec = require('child_process').exec;
    let command = "mountvol";

    return new Promise((res, rej) => {
        exec(command, function(error, stdout, stderr) {
            if (error) rej(error)
            else res(stdout);
        });
    });
}

/**
 * Parses the results of the mountvol command.
 * @constructor
 * @param {string} results - The mountvol results to be parsed
 */
var parse = function(results) {
    let i = 0;
    let volumes = [];
    var results = results
        .toString()
        .split("\n");

    while (i < results.length) {
        let line = results[i].trim();
        let isPath = _(line).startsWith('\\');
        let obj = {};

        if (isPath) {
            let guid = parseGuid(line);
            let mount = parseMount(results[i + 1]);

            if (guid) obj.guid = guid;
            if (mount) obj.mounts = [mount];

            volumes.push(obj);
        }

        i++;
    }

    return volumes;
}

/**
 * Obtain the raw guid from the given path.
 * @constructor
 * @param {string} path - path containing the guid
 */
let parseGuid = function(path) {
    return path.match(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/i)[0];
}

/**
 * Obtain the mount point of a volume.
 * @constructor
 * @param {string} mount - possible mount point
 */
let parseMount = function(mount) {
    var mount = mount.trim();
    let matches = mount.match(/[a-zA-Z]:\\/);

    if (matches === null) return null;
    else return matches[0];
}
