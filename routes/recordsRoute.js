"use strict";

import express from 'express';
import RecordsService from '../services/recordsService';
import GetirRepo from '../repos/getirRepo';

const router = express.Router();

router.post('/items', async (req, res) => {
    var repository = new GetirRepo();
    const recordsService = new RecordsService(repository);
    var items = await recordsService.queryItems(req.body);

    res.json({
        code: 200,
        msg: "Success",
        records: items
    });
});

export default router;