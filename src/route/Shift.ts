import express from 'express';
import { Roles } from '../lib/enum/Role.enum';
import permission from '../middleware/Permission';
import {
	AssignShiftToEmployee,
	Create,
	Delete,
	EmployeeShift,
	FindAll,
	RemoveShiftFromEmployee,
	SingleShift,
	Update,
} from '../controller/Shift';

const router = express.Router();

router.post('/create', permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), Create);
router.patch('/update/:id', permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), Update);
router.delete('/delete/:id', permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), Delete);
router.get('/all', permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), FindAll);
router.get('/my-shift', permission([Roles.ADMINISTRATOR, Roles.EMPLOYEE]), EmployeeShift);
router.get('/single/:id', permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), SingleShift);
router.patch('/assign/:id', permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), AssignShiftToEmployee);
router.patch('/remove/:id', permission([Roles.ADMINISTRATOR, Roles.SUPERVISOR]), RemoveShiftFromEmployee);

export default router;
