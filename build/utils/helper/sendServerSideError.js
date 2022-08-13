"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendServerSideError = void 0;
const sendServerSideError = (res, message) => {
    return res.status(500).json({
        status: 'error',
        message: message || 'Something went wrong',
    });
};
exports.sendServerSideError = sendServerSideError;
