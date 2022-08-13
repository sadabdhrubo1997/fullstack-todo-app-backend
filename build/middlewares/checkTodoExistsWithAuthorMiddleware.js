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
const sendServerSideError_1 = require("../utils/helper/sendServerSideError");
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
        const existingTodo = yield todoModel_1.default.findOne({
            _id: todoId,
            user: req.user.id,
        }).lean();
        if (!existingTodo) {
            return res.status(400).json({
                status: 'error',
                message: 'Todo does not exists or you do not have permission.',
            });
        }
        const tmp = {
            todo: existingTodo,
        };
        req.temp = tmp;
        next();
    }
    catch (error) {
        return (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.checkTodoExistsWithAuthorMiddleware = checkTodoExistsWithAuthorMiddleware;
