// Require
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const md5 = require('md5');
// Utils
const log = require('../utils/log.js').withModule('user');

// User

const userRoles = {
    CLIENT: 'client',
    OPERATOR: 'operator',
}

const itemSchema = Schema({
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    email: {type: String, default: ''},
    pass: {type: String, default: ''},
    role: {type: String, default: userRoles.CLIENT},
    created: {type: Date, default: null},
    updated: {type: Date, default: null},
});

itemSchema.statics.roles = userRoles;

// Static methods

itemSchema.statics.userWithEmailAndPass = function(email, pass, cb){
    const hashedPass = md5(pass);
    this.find({email, pass: hashedPass}, (err, items) => {
        if (err) return cb(err);
        if(!items || (items.length == 0)) return cb(null, null);
        return cb(null, items[0]);
    });
}

// Item methods

itemSchema.methods.data = function(){
    const data = this.toJSON();
    data.id = data._id;
    if(data.pass != undefined) delete data.pass;
    if(data._id != undefined) delete data._id;
    if(data.__v != undefined) delete data.__v;
    return data;
}

itemSchema.methods.updateData = function(data = {}, cb){
    if(data.firstName) this.firstName = data.firstName;
    if(data.lastName) this.lastName = data.lastName;
    if(data.email) this.email = data.email;
    this.updated = new Date();
    this.save(cb);
}

module.exports = itemSchema;