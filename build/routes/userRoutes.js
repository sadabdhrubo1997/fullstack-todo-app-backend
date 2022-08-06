"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.post('/user/registration', user_1.userRegistrationController);
router.post('/user/login', user_1.userLoginController);
router.get('/user/isLoggedIn', user_1.userIsLoggedInController);
router.get('/user/logout', user_1.userLogoutController);
exports.default = router;
