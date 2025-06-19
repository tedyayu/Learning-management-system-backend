"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentController_1 = require("../controller/departmentController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/createDepartment", auth_middleware_1.authenticateUser, departmentController_1.createDepartment);
router.get("/all", departmentController_1.fetchAllDepartments);
router.get("/search", auth_middleware_1.authenticateUser, departmentController_1.searchDepartment);
router.delete("/delete/:id", auth_middleware_1.authenticateUser, departmentController_1.deleteDepartment);
router.put("/update/:id", auth_middleware_1.authenticateUser, departmentController_1.updateDepartment);
router.put("/publish/:id", auth_middleware_1.authenticateUser, departmentController_1.publishDepartment);
router.put("/unpublish/:id", auth_middleware_1.authenticateUser, departmentController_1.unpublishDepartment);
exports.default = router;
