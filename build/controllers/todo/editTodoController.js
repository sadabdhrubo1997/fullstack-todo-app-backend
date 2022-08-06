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
exports.editTodoController = void 0;
const todoModel_1 = __importDefault(require("./../../models/todoModel"));
const editTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { todoId } = req.params;
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
    // check todo title field length
    if (description.length > 1000) {
        return res.status(400).json({
            status: 'error',
            message: 'Todo description can not be more than 100 characters.',
        });
    }
    try {
        const createdTodo = yield todoModel_1.default.findByIdAndUpdate(todoId, {
            title,
            description,
        }, { new: true });
        res
            .status(200)
            .json({ message: 'updated successfully', data: createdTodo });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.editTodoController = editTodoController;
