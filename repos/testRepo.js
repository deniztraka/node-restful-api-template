"use strict";
import BaseRepository from './baseRepo';
import mongoose from 'mongoose';
import Item from '../models/Item';

export default class TestRepo extends BaseRepository {
    constructor() {
        super(process.env.TEST_CONNSTRING);
        mongoose.connect(
            this.connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        mongoose.connection.on('open', function (ref) {
            console.log('Connected to mongo server.');
            //trying to get collection names
            mongoose.connection.db.listCollections().toArray(function (err, names) {
                console.log(names); // [{ name: 'dbname.myCollection' }]
            });
        });
    }
    /**
     * Adds an item to repo
     * 
     * @param {Object} objectToAdd 
     */
    async queryItems(queryObj,fields) {
        let alItems = null;
        try {
            alItems = await Item.find(queryObj,fields);
        } catch (err) {
            console.log(err);
        }

        return alItems;
    }

    async addItem(itemToAdd) {
        let item = null;
        try {
            item = new Item({
                count: itemToAdd.count
            });
            await item.save();
        } catch (err) {
            console.log(err);
        }

        return item;
    }
}