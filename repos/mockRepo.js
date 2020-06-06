"use strict";
import BaseRepository from './baseRepo';

const items = [{
        count: [3, 4, 6, 7, 8, 3, 4]
    },
    {
        count: [3, 4, 6, ]
    },
    {
        count: [1, 3, 4, 3]
    },
    {
        count: [2]
    },
    {
        count: [6, 7, 8]
    }
];

export default class TestItemsRepository extends BaseRepository {
    constructor() {
        super("");
    }
    async getItems() {
        let alItems = null;
        try {
            alItems = await items;
        } catch (err) {
            //bullshit
        }

        return alItems;
    }
}