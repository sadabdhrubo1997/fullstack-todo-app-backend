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
exports.userIsLoggedInController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const jwtService_1 = require("../../utils/jwtService");
const cookie_1 = require("../../utils/cookie");
const resizeObject_1 = require("../../utils/helper/resizeObject");
const userIsLoggedInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!(token === null || token === void 0 ? void 0 : token.trim())) {
        return res
            .status(401)
            .json({ status: 'error', message: 'Unauthorized request' });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        let user = yield userModel_1.default.findById(id).lean();
        if (!user) {
            return res
                .status(404)
                .json({ status: 'error', message: 'User not found' });
        }
        const newToken = (0, jwtService_1.createJwtToken)({
            email: user.email,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            allowLogin: true,
        });
        const userData = (0, resizeObject_1.resizeObject)({
            src: user,
            removeOnly: ['__v', 'createdAt', 'updatedAt'],
        });
        return res
            .status(200)
            .cookie('token', newToken, (0, cookie_1.cookieOptions)())
            .json({
            status: 'success',
            message: 'login success',
            data: {
                user: userData,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message,
            message: 'something went wrong',
        });
    }
});
exports.userIsLoggedInController = userIsLoggedInController;
