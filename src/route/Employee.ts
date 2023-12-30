import express from 'express';
import { Roles } from '../lib/enum/Role.enum';
import permission from '../middleware/Permission';
import {
	DeleteEmployee,
	EmployeeRoleChange,
	MyProfile,
	TagEmployeeToSupervisor,
	UntagEmployeeFromSupervisor,
	UpdateEmployee,
} from '../controller/Employee';

const router = express.Router();

router.get('/me', permission([Roles.ADMINISTRATOR, Roles.EMPLOYEE, Roles.SUPERVISOR]), MyProfile);
router.patch('/update/:id', permission([Roles.ADMINISTRATOR, Roles.EMPLOYEE, Roles.SUPERVISOR]), UpdateEmployee);
router.delete('/delete/:id', permission([Roles.ADMINISTRATOR]), DeleteEmployee);
router.patch('/role-change/:id', permission([Roles.ADMINISTRATOR]), EmployeeRoleChange);
router.patch('/tag-employee-to-supervisor/:id', permission([Roles.ADMINISTRATOR]), TagEmployeeToSupervisor);
router.patch('/remove-employee-from-supervisor/:id', permission([Roles.ADMINISTRATOR]), UntagEmployeeFromSupervisor);

export default router;
