"use strict";

import mongoose from 'mongoose';

const recordsSchema = mongoose.Schema({
    key:String,
    counts: [Number]
}, {
    timestamps: true
});

export default mongoose.model('records', recordsSchema);