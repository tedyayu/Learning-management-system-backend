import express from 'express'; 
import { createDepartment, fetchAllDepartments, searchDepartment ,deleteDepartment,updateDepartment,publishDepartment ,unpublishDepartment} from '../controller/departmentController';


const router=express.Router();

router.post("/createDepartment",createDepartment);
router.get("/all",fetchAllDepartments);
router.get("/search",searchDepartment);
router.delete("/delete/:id",deleteDepartment);
router.put("/update/:id",updateDepartment);
router.put("/publish/:id",publishDepartment);
router.put("/unpublish/:id",unpublishDepartment);

export default router;
