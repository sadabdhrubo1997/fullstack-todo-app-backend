"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoRoutes_1 = __importDefault(require("./todoRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const subTaskRoutes_1 = __importDefault(require("./subTaskRoutes"));
const router = (0, express_1.Router)();
router.use(userRoutes_1.default);
router.use(todoRoutes_1.default);
router.use(subTaskRoutes_1.default);
exports.default = router;
