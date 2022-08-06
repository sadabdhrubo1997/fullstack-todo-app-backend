"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// eslint-disable-next-line no-unused-vars
const createJwtToken = (payload, expiry) => {
    if (!expiry) {
        return jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret);
    }
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: expiry });
};
exports.createJwtToken = createJwtToken;
