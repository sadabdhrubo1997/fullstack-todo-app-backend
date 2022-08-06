"use strict";
// import config from '../config';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = void 0;
const config_1 = __importDefault(require("../config"));
// max age one month
const maxCookieAge = 30 * 24 * 60 * 60 * 1000;
const cookieOptions = (expiry = new Date(Date.now() + maxCookieAge)) => {
    const options = {
        secure: config_1.default.environment === 'dev' ? false : true,
        sameSite: 'none',
        httpOnly: true,
        expires: expiry,
    };
    return options;
};
exports.cookieOptions = cookieOptions;
