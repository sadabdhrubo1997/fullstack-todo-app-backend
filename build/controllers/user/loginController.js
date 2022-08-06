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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const cookie_1 = require("../../utils/cookie");
const jwtService_1 = require("../../utils/jwtService");
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check for all the required fields
    if (!(email === null || email === void 0 ? void 0 : email.trim()) || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Email and password are required.',
        });
    }
    try {
        // check if user already exists
        const user = yield userModel_1.default.findOne({
            email: email.trim().toLowerCase(),
        })
            .select(['+password -createdAt -updateAt -__v'])
            .lean();
        if (!user) {
            return res
                .status(400)
                .json({ status: 'error', message: 'User does not exist' });
        }
        const { password: hashedPassword } = user, userDataWithoutPass = __rest(user, ["password"]);
        const isPasswordMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ status: 'error', message: 'Invalid credentials' });
        }
        const token = (0, jwtService_1.createJwtToken)({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
            allowLogin: true,
        });
        const userDataToSend = {
            _id: user._id,
            email: user.firstName,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return res
            .status(200)
            .cookie('token', token, (0, cookie_1.cookieOptions)())
            .json({
            status: 'success',
            message: 'Login successful',
            data: { user: userDataToSend },
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.userLoginController = userLoginController;
