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
exports.checkTodoExistsWithAuthorMiddleware = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
const checkTodoExistsWithAuthorMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    // check for Todo Id through params
    if (!todoId) {
        return res.status(400).json({
            status: 'error',
            message: 'Todo Id through params is required.',
        });
    }
    try {
        // check if the task exists with id
        const existingTask = yield todoModel_1.default.findOne({
            _id: todoId,
            userId: req.user.id,
        });
        if (!existingTask) {
            return res.status(400).json({
                status: 'error',
                message: 'Todo does not exists or you do not have permission.',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.checkTodoExistsWithAuthorMiddleware = checkTodoExistsWithAuthorMiddleware;
