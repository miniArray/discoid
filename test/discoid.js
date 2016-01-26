"use strict";

var Promise = require('bluebird');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var path = require("path");

chai.should();
chai.use(chaiAsPromised);

var discoid = require('../lib/discoid');

describe('discoid', () => {
    describe('#list()', () => {
        it('should list all connected volumes', () => {
            let list = discoid.list();
            list.should.be.be.fulfilled;
            list.should.eventually.be.an('array');
        });
    });
});
