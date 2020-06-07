import RecordsService from '../services/recordsService';
import MockRepo from '../repos/mockRepo';
const mongoose = require('mongoose');

import ValidationError from '../services/validators/validationError';

import {
    MongoMemoryServer
} from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();



/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    const uri = await mongod.getUri();
    mongoose.connect(
        uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
});


/**
 * Records service test suite.
 */
describe('## Records Service Tests ## ', () => {
    it('should throw validation error for wrong startDate format: 2016.07.06', async () => {
        expect.assertions(1);
        try {
            let recordsService = new RecordsService(new MockRepo());
            await recordsService.queryItems({
                "startDate": "2016.07.06",
                "endDate": "2016-07-07",
                "minCount": 2800,
                "maxCount": 2801
            });
        } catch (e) {
            expect(e.message).toEqual("Request payload is not valid.");
        }
    });

    it('should throw validation error for wrong endDate format: 2016/07-07', async () => {
        expect.assertions(1);
        try {
            let recordsService = new RecordsService(new MockRepo());
            await recordsService.queryItems({
                "startDate": "2016-07-06",
                "endDate": "2016/07-07",
                "minCount": 2800,
                "maxCount": 2801
            });
        } catch (e) {
            expect(e.message).toEqual("Request payload is not valid.");
        }
    });

    it('should throw validation error for wrong minCount entry: "asd"', async () => {
        expect.assertions(1);
        try {
            let recordsService = new RecordsService(new MockRepo());
            await recordsService.queryItems({
                "startDate": "2016-07-06",
                "endDate": "2016/07-07",
                "minCount": "asd",
                "maxCount": 2801
            });
        } catch (e) {
            expect(e.message).toEqual("Request payload is not valid.");
        }
    });

    it('should throw validation error for wrong maxCount entry: "asdd"', async () => {
        expect.assertions(1);
        try {
            let recordsService = new RecordsService(new MockRepo());
            await recordsService.queryItems({
                "startDate": "2016-07-06",
                "endDate": "2016/07-07",
                "minCount": 1500,
                "maxCount": "asdd"
            });
        } catch (e) {
            expect(e.message).toEqual("Request payload is not valid.");
        }
    });

    it('should not throw any error', async () => {
         expect(async () => {
            let recordsService = new RecordsService(new MockRepo());
            await recordsService.queryItems({
                "startDate": "2016-07-06",
                "endDate": "2016-07-07",
                "minCount": 1500,
                "maxCount": 1500
            });
        }).not.toThrow();        

    });
});