"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusSetTodoController = void 0;
const todoModel_1 = __importDefault(require("../../models/todoModel"));
const getUserWIseSubTasks_1 = require("./../../utils/helper/getUserWIseSubTasks");
const statusSetTodoController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const { status } = req.body; // status could be 'new', 'ongoing', 'paused', 'done' only
    if (!(status === 'new' ||
        status === 'ongoing' ||
        status === 'paused' ||
        status === 'done')) {
        return res.status(400).json({
            status: 'error',
            message: 'todo status could be only new or ongoing or paused or done',
        });
    }
    try {
        const createdTodo = yield todoModel_1.default.findByIdAndUpdate(todoId, {
            status,
        }, { new: true });
        const subTasks = yield (0, getUserWIseSubTasks_1.getUserWIseSubTasks)({
            userId: req.user.id,
            todoId,
            next,
        });
        const data = {
            todo: createdTodo,
            subTasks,
        };
        res.status(200).json({
            message: 'updated successfully',
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.statusSetTodoController = statusSetTodoController;
