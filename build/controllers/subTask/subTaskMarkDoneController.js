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
exports.subTaskMarkDoneController = void 0;
const subTaskModel_1 = __importDefault(require("../../models/subTaskModel"));
const todoModel_1 = __importDefault(require("../../models/todoModel"));
const sendServerSideError_1 = require("./../../utils/helper/sendServerSideError");
const subTaskMarkDoneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskId } = req.params;
    try {
        // update the sub tasks document
        let updatedSubTask = yield subTaskModel_1.default.findByIdAndUpdate(subTaskId, {
            isDone: true,
        }, { new: true });
        const updatedTodo = yield todoModel_1.default.findOneAndUpdate({ _id: req.temp.subTasks.todo._id }, { $inc: { doneSubTasks: 1 } }, { new: true });
        res.status(200).json({
            status: 'success',
            message: 'sub task marked as done successfully',
            data: {
                subTask: updatedSubTask,
                todo: updatedTodo,
            },
        });
    }
    catch (error) {
        (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.subTaskMarkDoneController = subTaskMarkDoneController;
