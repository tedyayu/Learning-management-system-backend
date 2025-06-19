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
exports.createNewDepartment = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const createNewDepartment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield prismaInstance_1.default.department.create({
            data: {
                name: data.name,
                lead: data.lead,
                description: data.description,
                email: data.email,
                location: data.location
            }
        });
        return department;
    }
    catch (error) {
        console.error("Error creating department:", error);
        throw new Error("Could not create department");
    }
});
exports.createNewDepartment = createNewDepartment;
