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
exports.deleteTodoController = void 0;
const subTaskModel_1 = __importDefault(require("../../models/subTaskModel"));
const sendServerSideError_1 = require("../../utils/helper/sendServerSideError");
const todoModel_1 = __importDefault(require("./../../models/todoModel"));
const deleteTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    console.log(req.temp.todo);
    try {
        const deletedTodo = yield todoModel_1.default.findByIdAndDelete(todoId);
        let deletedSubTasks;
        const subTasksToDelete = yield subTaskModel_1.default.find({
            todo: todoId,
            user: req.user.id,
        });
        if (deletedTodo) {
            deletedSubTasks = yield subTaskModel_1.default.deleteMany({
                todo: todoId,
                user: req.user.id,
            });
        }
        const data = {
            todo: deletedTodo,
            subTasks: subTasksToDelete,
        };
        res.status(200).json({
            status: 'success',
            message: 'from delete todo controller',
            data,
        });
    }
    catch (error) {
        (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.deleteTodoController = deleteTodoController;
