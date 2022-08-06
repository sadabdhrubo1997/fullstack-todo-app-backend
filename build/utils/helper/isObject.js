"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
exports.isObject = isObject;
