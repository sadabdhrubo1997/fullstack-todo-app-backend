"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { NODE_ENV, PORT, JWT_SECRET, MONGO_URI, FRONTEND_URL } = process.env;
const config = Object.freeze({
    environment: NODE_ENV || 'dev',
    port: Number(PORT) || 8080,
    jwtSecret: JWT_SECRET || '',
    mongoURI: MONGO_URI || '',
    frontendURL: FRONTEND_URL || 'https://localhost:3002',
});
exports.default = config;
