"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubTaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
        maxlength: [100, 'Title can not be more then 100 characters'],
    },
    description: {
        type: String,
        require: true,
        maxlength: [1000, 'Title can not be more then 1000 characters'],
    },
    todo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Todo',
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const SubTaskModel = (0, mongoose_1.model)('SubTask', SubTaskSchema);
exports.default = SubTaskModel;
