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
exports.editSubTaskController = void 0;
// import SubTaskModel from '../../models/subTaskModel';
const sendServerSideError_1 = require("./../../utils/helper/sendServerSideError");
const subTaskModel_1 = __importDefault(require("./../../models/subTaskModel"));
const editSubTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { subTasks: prevSubTasks } = req.temp;
    const { subTaskId } = req.params;
    if (prevSubTasks.title == title && prevSubTasks.description == description) {
        return res.status(400).json({
            status: 'error',
            message: 'Sub task title or description mush have to be new. You are giving current title and description.',
        });
    }
    try {
        const editedSubTask = yield subTaskModel_1.default.findByIdAndUpdate(subTaskId, {
            title,
            description,
            isDone: false,
        }, { new: true });
        res.status(200).json({
            status: 'success',
            message: 'Sub task edited successfully',
            data: editedSubTask,
        });
    }
    catch (error) {
        (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.editSubTaskController = editSubTaskController;
