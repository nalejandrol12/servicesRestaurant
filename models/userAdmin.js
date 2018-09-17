'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserAdminSchema = new Schema({
    name: String,
    image: String,
    schedule: String,
    address: String,
    phone: Number,
    description: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, required: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserAdminSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

UserAdminSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);

        return cb(null, isMatch);
    });
};

module.exports = mongoose.model('UserAdmin', UserAdminSchema);