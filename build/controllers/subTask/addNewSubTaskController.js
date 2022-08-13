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
exports.addNewSubTaskController = void 0;
const subTaskModel_1 = __importDefault(require("../../models/subTaskModel"));
const todoModel_1 = __importDefault(require("../../models/todoModel"));
const sendServerSideError_1 = require("../../utils/helper/sendServerSideError");
const addNewSubTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTasks = [] } = req.body;
    const { todoId } = req.params;
    const subTasksToAdd = [];
    if (!subTasks.length) {
        return res.status(400).json({
            status: 'error',
            message: 'Please give minimum one sub tasks.',
        });
    }
    if (subTasks.length) {
        for (let i = 0; i < subTasks.length; i++) {
            const element = subTasks[i];
            const { title, description } = element;
            // check for all the required fields
            if (!title || !description) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Sub Task title and Sub Task description are required.',
                });
            }
            // check todo title field length
            if (title.length > 100) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Sub Task title can not be more than 100 characters.',
                });
            }
            // check todo description field length
            if (description.length > 1000) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Sub Task description can not be more than 100 characters.',
                });
            }
            element.todo = todoId;
            element.user = req.user.id;
            subTasksToAdd.push(element);
        }
    }
    try {
        const data = {
            subTasks: [],
            todo: null,
        };
        if (subTasksToAdd.length) {
            const addedSubtasks = yield subTaskModel_1.default.insertMany(subTasksToAdd);
            data.subTasks = addedSubtasks;
            const updatedTodo = yield todoModel_1.default.findOneAndUpdate({ _id: todoId }, { $inc: { totalSubTasks: subTasksToAdd.length } }, { new: true });
            data.todo = updatedTodo;
        }
        res.status(200).json({ status: 'success', data });
    }
    catch (error) {
        (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.addNewSubTaskController = addNewSubTaskController;
