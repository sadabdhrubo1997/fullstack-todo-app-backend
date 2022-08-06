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
exports.userLogoutController = void 0;
const userLogoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .status(200)
            .cookie('token', '', {
            expires: new Date(0),
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        })
            .json({ status: 'success', message: 'Logout success' });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'something went wrong',
        });
    }
});
exports.userLogoutController = userLogoutController;
