"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
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
    status: {
        type: String,
        enum: ['new', 'ongoing', 'paused', 'done'],
        default: 'new',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalSubTasks: {
        type: Number,
        default: 0,
    },
    doneSubTasks: {
        type: Number,
        default: 0,
    },
    trash: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const TodoModel = (0, mongoose_1.model)('Todo', TodoSchema);
exports.default = TodoModel;
