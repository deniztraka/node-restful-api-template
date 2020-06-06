"use strict";

import express from 'express';
import ItemsService from '../services/itemsService';
import TestRepository from '../repos/testRepo';
import GetirRepo from '../repos/getirRepo';

const router = express.Router();

router.post('/items', async (req, res) => {
    //todo: make it actual db
    //var repository = new TestRepository();        
    

    var repository = new GetirRepo();
    const itemsService = new ItemsService(repository);
    
    var items = await itemsService.queryItems(req.body);
    res.json(items);
});

router.post('/item', async (req, res) => {
    //todo: make it actual db
    var repository = new TestRepository();        
    const itemsService = new ItemsService(repository);
    
    var addedItem = await itemsService.addItem(req.body);
    res.json(addedItem);
});

export default router;