import express from "express";
import { Roles } from "../lib/enum/Role.enum";
import permission from "../middleware/Permission";
import { Create, Delete, EmployeeShift, FindAll, SingleShift, Update } from "../controller/Shift";

const router = express.Router();


router.post("/create", permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), Create)
router.patch("/update/:id", permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), Update)
router.delete("/delete/:id", permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), Delete)
router.get("/all", permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), FindAll)
router.get("/:id", permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), SingleShift)
router.get("/employee", permission([Roles.EMPLOYEE,Roles.ADMINISTRATOR]), EmployeeShift)



export default router;
