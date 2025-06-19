"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("./apiError"));
class NotFoundError extends apiError_1.default {
    constructor(message) {
        super(404, message);
    }
}
exports.default = NotFoundError;
