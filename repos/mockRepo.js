"use strict";
import Records from '../models/Records';

export default class MockRepository {
    constructor() {       
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
            }
        ]);
    }
}