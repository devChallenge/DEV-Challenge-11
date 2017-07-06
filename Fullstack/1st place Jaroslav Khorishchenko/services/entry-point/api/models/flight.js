// Require
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
// Utils
const log = require('../utils/log.js').withModule('flight');

// Filght

const itemSchema = Schema({
    id: {type: String, default: '', unique: true},
    start: {type: String, default: ''},
    duration: {type: Number, min: 0, default: 1},
    origin: {type: String, default: ''},
    destination: {type: String, default: ''},
    cost: {type: Number, min: 0, default: 0},
    created: {type: Date, default: null},
    updated: {type: Date, default: null},
});

// Static methods

itemSchema.statics.add = function(data, cb){
    data.updated = new Date();
    data.created = new Date();
    if(data.origin) data.origin = data.origin.trim().toLowerCase();
    if(data.destination) data.destination = data.destination.trim().toLowerCase();
    this.create(data, cb);
}

// Item methods

itemSchema.methods.data = function(){
    const data = this.toJSON();
    if(data.__v != undefined) delete data.__v;
    if(data._id != undefined) delete data._id;
    return data;
}

itemSchema.methods.update = function(data, cb){
    if(!data) throw new Error('data not set');
    if(data.start !== undefined) this.start = data.start;
    if(data.duration !== undefined) this.duration = data.duration;
    if(data.origin !== undefined) this.origin = data.origin;
    if(data.destination !== undefined) this.destination = data.destination;
    if(data.cost !== undefined) this.cost = data.cost;
    this.updated = new Date();
    this.save(cb);
}

module.exports = itemSchema;