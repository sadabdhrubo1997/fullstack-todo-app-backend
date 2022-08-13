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
exports.checkSubTaskExistsWithAuthorMiddleware = void 0;
const sendServerSideError_1 = require("../utils/helper/sendServerSideError");
const subTaskModel_1 = __importDefault(require("./../models/subTaskModel"));
const checkSubTaskExistsWithAuthorMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskId } = req.params;
    // check for Todo Id through params
    if (!subTaskId) {
        return res.status(400).json({
            status: 'error',
            message: 'sub task Id through params is required.',
        });
    }
    try {
        // check if the sub task exists with id
        const existsSubTask = yield subTaskModel_1.default.findOne({
            _id: subTaskId,
            user: req.user.id,
        })
            .populate('todo')
            .populate('user')
            .lean();
        if (!existsSubTask) {
            return res.status(400).json({
                status: 'error',
                message: 'Sub tasks does not exists or you do not have permission to access the sub task.',
            });
        }
        // check if the sub task wrapper todo exists with id
        if (!existsSubTask.todo) {
            return res.status(400).json({
                status: 'error',
                message: 'Sub Tasks wrapper todo does not exists .',
            });
        }
        // // check if the user authorized to access the sub task
        // if (!existsSubTask.user=== req.user.id) {
        //   return res.status(400).json({
        //     status: 'error',
        //     message:
        //       'You do not have permission to access the sub task.',
        //   });
        // }
        const tmp = {
            subTasks: existsSubTask,
        };
        req.temp = tmp;
        next();
    }
    catch (error) {
        return (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.checkSubTaskExistsWithAuthorMiddleware = checkSubTaskExistsWithAuthorMiddleware;
