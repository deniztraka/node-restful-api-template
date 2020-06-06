"use strict";

import express from 'express';
import ItemsService from '../services/itemsService';
import GetirRepo from '../repos/getirRepo';

const router = express.Router();

router.post('/items', async (req, res) => {
    var repository = new GetirRepo();
    const itemsService = new ItemsService(repository);
    var items = await itemsService.queryItems(req.body);

    res.json({
        code: 200,
        msg: "Success",
        records: items
    });
});

export default router;