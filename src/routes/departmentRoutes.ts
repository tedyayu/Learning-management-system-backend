import express from 'express'; 
import { createDepartment, fetchAllDepartments, searchDepartment ,deleteDepartment,updateDepartment,publishDepartment ,unpublishDepartment} from '../controller/departmentController';
import {authenticateUser} from "../middleware/auth.middleware"


const router=express.Router();

router.post("/createDepartment",authenticateUser,createDepartment);
router.get("/all",fetchAllDepartments);
router.get("/search",authenticateUser,searchDepartment);
router.delete("/delete/:id",authenticateUser,deleteDepartment);
router.put("/update/:id",authenticateUser,updateDepartment);
router.put("/publish/:id",authenticateUser,publishDepartment);
router.put("/unpublish/:id",authenticateUser,unpublishDepartment);

export default router;
