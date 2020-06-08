"use strict";
import mongoose from 'mongoose';
import Records from '../models/Records';


export default class GetirRepo {
    constructor() {
        mongoose.connect(
            process.env.GETIR_CONNSTRING, {
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
        return await Records.aggregate([{
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
                    key: "$key",
                    _id: false
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
            }
        ]);
    }
}