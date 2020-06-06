"use strict";
import BaseRepository from './baseRepo';
import mongoose from 'mongoose';
import Item from '../models/Item';

export default class GetirRepo extends BaseRepository {
    constructor() {
        super(process.env.GETIR_CONNSTRING);
        mongoose.connect(
            this.connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    }
    /**
     * Queries for records according to given query object
     * 
     * @param {Object} objectToAdd 
     */
    async queryItems(queryObj) {
        return await Item.aggregate([{
            //returns items between provided dates in query object and 
            "$match": {
                "createdAt": {
                    "$gte": new Date(queryObj.startDate),
                    "$lt": new Date(queryObj.endDate)
                }
            }
        }, {
            //maps sum of resulted counts on totalCount
            $project: {
                totalCount: {
                    $sum: "$counts"
                },
                createdAt: "$createdAt",
                key: "$key"
            }
        },
        {
            //filters resulted items between provided totalCount
            "$match": {
                "totalCount": {
                    "$gte": queryObj.minCount,
                    "$lt": queryObj.maxCount
                }
            }
        }]);
    }
}