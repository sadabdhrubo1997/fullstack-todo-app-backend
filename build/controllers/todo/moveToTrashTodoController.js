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
exports.moveToTrashTodoController = void 0;
const moveToTrashTodoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    try {
        console.log(todoId);
        res.status(200).json({
            status: 'success',
            message: 'todo moved to trash successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.moveToTrashTodoController = moveToTrashTodoController;
