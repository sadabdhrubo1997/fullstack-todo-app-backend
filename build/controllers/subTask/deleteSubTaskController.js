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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubTaskController = void 0;
const sendServerSideError_1 = require("./../../utils/helper/sendServerSideError");
const deleteSubTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskId } = req.params;
    console.log(req.temp.subTasks);
    try {
        // let updatedSubTask = await SubTaskModel.deleteOne()
        // const updatedTodo = await TodoModel.findOneAndUpdate(
        //   { _id: req.temp.subTasks.todo._id },
        //   { $inc: { doneSubTasks: 1 } },
        //   { new: true }
        // );
        res.status(200).json({
            status: 'success',
            message: 'sub task marked as done successfully',
            data: {
                subTask: req.temp.subTasks,
                todo: null,
            },
        });
    }
    catch (error) {
        (0, sendServerSideError_1.sendServerSideError)(res, error.message);
    }
});
exports.deleteSubTaskController = deleteSubTaskController;
