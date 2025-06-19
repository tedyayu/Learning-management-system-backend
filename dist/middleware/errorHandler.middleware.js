"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const library_1 = require("@prisma/client/runtime/library");
dotenv_1.default.config();
const errorHandlerMiddleware = (error, req, res, next) => {
    const defaultError = { status: 500, message: "Something went wrong" };
    if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }
    if (error instanceof apiError_1.default) {
        defaultError.status = error.status;
        defaultError.message = error.message;
    }
    if (error instanceof library_1.PrismaClientInitializationError) {
        if (process.env.NODE_ENV === "development") {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
    return res.status(defaultError.status).json({ error: defaultError.message });
};
exports.default = errorHandlerMiddleware;
