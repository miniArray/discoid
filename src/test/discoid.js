import Promise from 'bluebird'
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import path from "path"

import discoid from '../lib/discoid'

chai.should();
chai.use(chaiAsPromised);

describe('discoid', () => {
    describe('#list()', () => {
        it('should list all connected volumes', () => {
            let list = discoid.list();
            list.should.be.be.fulfilled;
            list.should.eventually.be.an('array');
        });
    });
});
