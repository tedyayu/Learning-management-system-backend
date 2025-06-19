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
exports.unpublishDepartment = exports.publishDepartment = exports.updateDepartment = exports.deleteDepartment = exports.searchDepartment = exports.fetchAllDepartments = exports.createDepartment = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const conflict_error_1 = __importDefault(require("../errors/conflict.error"));
const department_1 = require("../services/department");
exports.createDepartment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lead, description, email, location } = req.body;
    const department = yield (0, department_1.getDepartmentByname)(name);
    if (department)
        throw new conflict_error_1.default("Department already exists");
    const newDepartment = yield (0, department_1.createNewDepartment)({ name, lead, description, email, location });
    console.log(newDepartment);
    res.json(newDepartment);
}));
exports.fetchAllDepartments = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield (0, department_1.getAllDepartments)();
        res.json(department);
    }
    catch (error) {
        console.error("Error fetching department:", error);
        res.status(500).json({ error: "An error occurred while fetching departments" });
    }
}));
exports.searchDepartment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const department = yield (0, department_1.getDepartmentByname)(query);
        res.json(department);
    }
    catch (error) {
        console.error("Error searching department:", error);
        res.status(500).json({ error: "An error occurred while searching department" });
    }
}));
exports.deleteDepartment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const { id } = req.params;
        const department = yield (0, department_1.getDepartmentById)(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        yield (0, department_1.deleteDepartmentById)(id);
        res.json({ message: "Department deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ error: "An error occurred while deleting department" });
    }
}));
exports.updateDepartment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const department = yield (0, department_1.getDepartmentById)(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        const updatedDepartment = yield (0, department_1.updateDepartmentById)(id, updatedData);
        res.json({ message: "Department updated successfully", updatedDepartment });
    }
    catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ error: "An error occurred while updating the department" });
    }
}));
exports.publishDepartment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const department = yield (0, department_1.getDepartmentById)(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        if (department.published) {
            return res.status(400).json({ error: "Department already published" });
        }
        const publishedDepartment = yield (0, department_1.publishDepartmentById)(id);
        res.json({ message: "Department published successfully", publishedDepartment });
    }
    catch (error) {
        console.error("Error publishing department:", error);
        res.status(500).json({ error: "An error occurred while publishing the department" });
    }
}));
exports.unpublishDepartment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const department = yield (0, department_1.getDepartmentById)(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        if (!department.published) {
            return res.status(400).json({ error: "Department already unpublished" });
        }
        const unpublishedDepartment = yield (0, department_1.unpublishDepartmentById)(id);
        res.json({ message: "Department unpublished successfully", unpublishedDepartment });
    }
    catch (error) {
        console.error("Error unpublishing department:", error);
        res.status(500).json({ error: "An error occurred while unpublishing the department" });
    }
}));
