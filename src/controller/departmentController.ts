import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ConflictError from "../errors/conflict.error";
import {createNewDepartment,getDepartmentByname,getAllDepartments,deleteDepartmentById,getDepartmentById,updateDepartmentById,publishDepartmentById,unpublishDepartmentById} from "../services/department";

export const createDepartment = asyncHandler(async (req: Request, res: Response) => {
    const {name,lead,description,email,location}= req.body;
    const department = await getDepartmentByname(name);
    if (department) throw new ConflictError("Department already exists");

    const newDepartment = await createNewDepartment({name,lead,description,email,location});
    console.log(newDepartment)
    res.json(newDepartment);
});

export const fetchAllDepartments = asyncHandler(async (req: Request, res: Response) => {
    try {
        const department = await getAllDepartments();
        res.json(department);
    } catch (error) {
        console.error("Error fetching department:", error);
        res.status(500).json({ error: "An error occurred while fetching departments" });
    }
});

export const searchDepartment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        const department = await getDepartmentByname(query as string);
        res.json(department);
    } catch (error) {
        console.error("Error searching department:", error);
        res.status(500).json({ error: "An error occurred while searching department" });
    }
});

export const deleteDepartment = asyncHandler(async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const department = await getDepartmentById(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        await deleteDepartmentById(id);
        res.json({ message: "Department deleted successfully" });
    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ error: "An error occurred while deleting department" });
    }
});

export const updateDepartment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body; 
        
        const department = await getDepartmentById(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }

       
        const updatedDepartment = await updateDepartmentById(id, updatedData);
        res.json({ message: "Department updated successfully", updatedDepartment });
    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ error: "An error occurred while updating the department" });
    }
});

export const publishDepartment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 

        const department = await getDepartmentById(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        if(department.published){   
            return res.status(400).json({ error: "Department already published" });
        }

        const publishedDepartment = await publishDepartmentById(id);
        res.json({ message: "Department published successfully", publishedDepartment });
    } catch (error) {
        console.error("Error publishing department:", error);
        res.status(500).json({ error: "An error occurred while publishing the department" });
    }
});

export const unpublishDepartment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 

        const department = await getDepartmentById(id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        if(!department.published){   
            return res.status(400).json({ error: "Department already unpublished" });
        }

        const unpublishedDepartment = await unpublishDepartmentById(id);
        res.json({ message: "Department unpublished successfully", unpublishedDepartment });
    } catch (error) {
        console.error("Error unpublishing department:", error);
        res.status(500).json({ error: "An error occurred while unpublishing the department" });
    }
});