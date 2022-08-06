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
exports.userLoginMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userLoginMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!(token === null || token === void 0 ? void 0 : token.trim())) {
        return res
            .status(401)
            .json({ status: 'error', message: 'Unauthorized request' });
    }
    try {
        const { firstName, lastName, id, email, allowLogin } = (jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret));
        if (!allowLogin) {
            return res
                .status(401)
                .json({ status: 'error', message: 'Unauthorized request' });
        }
        const payload = {
            id,
            email,
            allowLogin,
            firstName,
            lastName,
        };
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.userLoginMiddleware = userLoginMiddleware;
