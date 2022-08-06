"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: [20, 'First name can not be more than 50 characters'],
    },
    lastName: {
        type: String,
        required: true,
        maxlength: [20, 'Last name can not be more than 50 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: [50, 'Email can not be more than 50 characters'],
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    avatar: { type: String, required: false },
}, {
    timestamps: true,
});
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
