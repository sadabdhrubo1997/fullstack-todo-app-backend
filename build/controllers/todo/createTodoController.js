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
exports.createTodoController = void 0;
const todoModel_1 = __importDefault(require("./../../models/todoModel"));
const subTaskModel_1 = __importDefault(require("./../../models/subTaskModel"));
const sendServerSideError_1 = require("../../utils/helper/sendServerSideError");
const createTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, subTasks = [] } = req.body;
    const subTasksToAdd = [];
    // check for all the required fields
    if (!title || !description) {
        return res.status(400).json({
            status: 'error',
            message: 'Todo title and todo description are required.',
        });
    }
    // check todo title field length
    if (title.length > 100) {
        return res.status(400).json({
            status: 'error',
            message: 'Todo title can not be more than 100 characters.',
        });
    }
    // check todo description field length
    if (description.length > 1000) {
        return res.status(400).json({
            status: 'error',
            message: 'Todo description can not be more than 100 characters.',
        });
    }
    try {
        const createdTodo = yield todoModel_1.default.create({
            title,
            description,
            user: req.user.id,
            totalSubTasks: subTasks.length,
        });
        if (subTasks.length) {
            for (let i = 0; i < subTasks.length; i++) {
                const element = subTasks[i];
                // check for all the required fields
                if (!element.title || !element.description) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Sub Task title and Sub Task description are required.',
                    });
                }
                // check todo title field length
                if (element.title.length > 100) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Sub Task title can not be more than 100 characters.',
                    });
                }
                // check todo description field length
                if (element.description.length > 1000) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Sub Task description can not be more than 100 characters.',
                    });
                }
                element.todo = createdTodo._id;
                element.user = req.user.id;
                subTasksToAdd.push(element);
            }
        }
        const data = {
            todo: createdTodo,
            subTasks: [],
        };
        if (subTasksToAdd.length) {
            const addedSubtasks = yield subTaskModel_1.default.insertMany(subTasksToAdd);
            data.subTasks = addedSubtasks;
        }
        res.status(200).json({ status: 'success', data });
    }
    catch (error) {
        (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.createTodoController = createTodoController;
