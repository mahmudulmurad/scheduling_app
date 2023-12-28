import express from "express";
import { Roles } from "../lib/enum/Role.enum";
import permission from "../middleware/Permission";
import { DeleteEmployee, UpdateEmployee } from "../controller/Employee";

const router = express.Router();

router.patch("/update/:id", permission([Roles.ADMINISTRATOR, Roles.EMPLOYEE]), UpdateEmployee)
router.delete("/delete/:id", permission([Roles.ADMINISTRATOR]), DeleteEmployee);

export default router;