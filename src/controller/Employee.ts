import { Request, Response } from 'express';
import 'dotenv/config';
import { EmployeeRoleDTO, EmployeeUntagDTO, EmployeeUpdateDTO } from '../lib/dto/Employee.dto';
import { Employee } from '../lib/model/Employee';
import { successResponse } from '../lib/service/SuccessResponse';
import { errorResponse } from '../lib/service/ErrorResponse';
import AuthRequest from '../lib/decorator/request';

export const MyProfile = async (req: AuthRequest, res: Response) => {
	try {
		const id = req.user.id;
		const profile = await Employee.findById(id).populate({
			path: 'myEmployees',
			select: '_id name email phone gender isActive role',
		});

		res.status(200).json(successResponse(profile, 'Profile fetched successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const UpdateEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const data: EmployeeUpdateDTO = req.body;

		const updatedUser = await Employee.findByIdAndUpdate(
			{ _id: id },
			{
				$set: data,
			},
			{ new: true }
		).populate({
			path: 'myEmployees',
			select: '_id name email phone gender isActive role',
		});
		res.status(200).json(successResponse(updatedUser, 'Profile updated successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const DeleteEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		// Check and deleting if the employee exists
		const deletedEmployee = await Employee.findOneAndDelete({ _id: id });
		if (!deletedEmployee) {
			return res.status(404).json(errorResponse('Employee not found'));
		}
		res.status(200).json(successResponse(deletedEmployee, 'Employee deleted successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const EmployeeRoleChange = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const data: EmployeeRoleDTO = req.body;

		const updatedUser = await Employee.findByIdAndUpdate(
			{ _id: id },
			{
				$set: data,
			},
			{ new: true }
		);
		res.status(200).json(successResponse(updatedUser, 'Role updated successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const TagEmployeeToSupervisor = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { myEmployees }: EmployeeUpdateDTO = req.body;

		const updatedUser = await Employee.findByIdAndUpdate(
			{ _id: id },
			{
				$addToSet: { myEmployees: { $each: myEmployees } },
			},
			{ new: true }
		);
		res.status(200).json(successResponse(updatedUser, 'Employee tagged successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const UntagEmployeeFromSupervisor = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const untagEmployee: EmployeeUntagDTO = req.body;

		const updatedUser = await Employee.findByIdAndUpdate(
			{ _id: id },
			{
				$pull: { myEmployees: untagEmployee.id },
			},
			{ new: true }
		);

		res.status(200).json(successResponse(updatedUser, 'Employee untagged successfully'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};
