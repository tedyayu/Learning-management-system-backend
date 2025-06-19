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
exports.unpublishDepartmentById = exports.publishDepartmentById = exports.updateDepartmentById = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const updateDepartmentById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield prismaInstance_1.default.department.update({
            where: {
                id: id
            },
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
        console.error("Error updating department:", error);
        throw new Error("Could not update department");
    }
});
exports.updateDepartmentById = updateDepartmentById;
const publishDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield prismaInstance_1.default.department.update({
            where: {
                id: id
            },
            data: {
                published: true
            }
        });
        return department;
    }
    catch (error) {
        console.error("Error publishing department:", error);
        throw new Error("Could not publish department");
    }
});
exports.publishDepartmentById = publishDepartmentById;
const unpublishDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield prismaInstance_1.default.department.update({
            where: {
                id: id
            },
            data: {
                published: false
            }
        });
        return department;
    }
    catch (error) {
        console.error("Error publishing department:", error);
        throw new Error("Could not publish department");
    }
});
exports.unpublishDepartmentById = unpublishDepartmentById;
