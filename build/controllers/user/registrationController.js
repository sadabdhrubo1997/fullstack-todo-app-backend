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
exports.userRegistrationController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const validator_1 = require("../../utils/validator");
const jwtService_1 = require("../../utils/jwtService");
const cookie_1 = require("../../utils/cookie");
const userRegistrationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    // check for all the required fields
    if (!(firstName === null || firstName === void 0 ? void 0 : firstName.trim()) || !(lastName === null || lastName === void 0 ? void 0 : lastName.trim()) || !(email === null || email === void 0 ? void 0 : email.trim()) || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'First Name, last Name, email and password are required.',
        });
    }
    // validate email
    if (!(0, validator_1.validateEmail)(email)) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter a valid email address',
        });
    }
    // validate password
    if (!(0, validator_1.validatePassword)(password)) {
        return res.status(400).json({
            status: 'error',
            message: 'Password should have minimum eight characters, at least one letter and one number',
        });
    }
    try {
        // check if email already exists
        const existingUser = yield userModel_1.default.findOne({
            email: email.trim().toLowerCase(),
        }).select(['-password -createdAt -updateAt -__v']);
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already exists',
            });
        }
        // hash password
        const salt = yield bcrypt_1.default.genSalt(12);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const token = (0, jwtService_1.createJwtToken)({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
            allowLogin: true,
        });
        res
            .status(200)
            .cookie('token', token, (0, cookie_1.cookieOptions)())
            .json({
            status: 'success',
            message: 'Registration successful',
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.userRegistrationController = userRegistrationController;
