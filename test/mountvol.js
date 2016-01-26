"use strict";

let Promise = require('bluebird');
let chai = require("chai");
let expect = chai.expect;
let chaiAsPromised = require("chai-as-promised");
let path = require("path");
let fs = require("fs");

chai.should();
chai.use(chaiAsPromised);

let mountvol = require('../lib/mountvol');

describe('mountvol', () => {
    describe('#init()', () => {
        let mountvolOutput = fs.readFileSync(__dirname + '/assets/mountvol-output.txt').toString();
        let volumes = mountvol(mountvolOutput);

        it('should return an array', () => volumes.should.eventually.be.an('array'));
        it('should have a length of 7', () => volumes.should.eventually.have.length(7));
        it('should have a specific objects', () => {
            volumes.should.eventually.include({
                'guid': '6f35a39a-4c5d-4208-ba6e-aa8d2a2add96',
                'unc': '\\\\?\\Volume{6f35a39a-4c5d-4208-ba6e-aa8d2a2add96}\\',
                'mounts': ['C:\\']
            });

            volumes.should.eventually.include({
                'guid': 'd9082c7e-c103-11e5-82cd-605718ebe2c1',
                'unc': '\\\\?\\Volume{d9082c7e-c103-11e5-82cd-605718ebe2c1}\\'
            });

            volumes.should.eventually.include({
                'guid': 'b0357aa2-c106-11e5-82ce-605718ebe2c1',
                'unc': '\\\\?\\Volume{b0357aa2-c106-11e5-82ce-605718ebe2c1}\\'
            });
        });
    });
});
