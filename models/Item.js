"use strict";

import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    key:String,
    counts: [Number]
}, {
    timestamps: true
});

export default mongoose.model('records', itemSchema);