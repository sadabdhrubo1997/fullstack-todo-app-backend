"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};
app_1.default.use(errorHandler);
mongoose_1.default.connect(config_1.default.mongoURI, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('connected to mongoDB');
    app_1.default.listen(process.env.PORT || 8080, () => {
        // console.log(
        //   `random OTP by crypto is : ${crypto.randomBytes(3).toString('hex')}`
        // );
        console.log(`server current environment is : ${config_1.default.environment}`);
        console.log('your app is running on http://localhost:8080');
    });
});
