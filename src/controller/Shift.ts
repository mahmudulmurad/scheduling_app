import { Request, Response } from 'express';
import { AssignEmployeeDto, ShiftDTO, ShiftUpdateDTO } from '../lib/dto/Shift.dto';
import { Shift } from '../lib/model/Shift';
import { successResponse } from '../lib/service/SuccessResponse';
import { errorResponse } from '../lib/service/ErrorResponse';
import AuthRequest from '../lib/decorator/request';

export const Create = async (req: Request, res: Response) => {
	try {
		const data: ShiftDTO = req.body;
		const newShift = new Shift(data);
		await newShift.save();

		res.status(201).json(successResponse(newShift, 'Shift created'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const Update = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const data: ShiftUpdateDTO = req.body;
		const updatedShift = await Shift.findByIdAndUpdate(
			{ _id: id },
			{
				$set: data,
			},
			{ new: true }
		);

		res.status(200).json(successResponse(updatedShift, 'Shift Updated'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const Delete = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		// Check and deleting if the shift exists
		const deletedShift = await Shift.findOneAndDelete({ _id: id });
		if (!deletedShift) {
			return res.status(404).json(errorResponse('Shift not found'));
		}

		res.status(200).json(successResponse(deletedShift, 'Shift deleted successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const FindAll = async (req: Request, res: Response) => {
	try {
		let query = {};
		if (req.query.date) {
			query = { ...query, date: req.query.date };
		}
		const shifts = await Shift.find(query).populate({
			path: 'assignedEmployees',
			select: '_id name email phone gender isActive role',
		});

		res.status(200).json(successResponse(shifts, 'Shifts fetched successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const SingleShift = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const shift = await Shift.findOne({ _id: id }).populate({
			path: 'assignedEmployees',
			select: '_id name email phone gender isActive role',
		});

		res.status(200).json(successResponse(shift, 'Shift fetched successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const EmployeeShift = async (req: AuthRequest, res: Response) => {
	try {
		const id = req.user.id;
		let query = {};
		if (req.query.date) {
			query = { ...query, date: req.query.date };
		}

		const shifts = await Shift.find({ ...query, assignedEmployees: { $in: [id] } }, { assignedEmployees: 0 });
		res.status(200).json(successResponse(shifts, 'Shift fetched successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const AssignShiftToEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { employeeId }: AssignEmployeeDto = req.body;

		const shift = await Shift.findOne({ _id: id });
		const matchedDay = await Shift.find({ assignedEmployees: { $in: [employeeId] }, date: shift.date });

		if (matchedDay.length === 0) {
			const assignee = await Shift.findByIdAndUpdate(
				{ _id: id },
				{
					$addToSet: { assignedEmployees: employeeId },
				},
				{ new: true }
			);

			return res.status(200).json(successResponse(assignee, 'Assigned successfully'));
		}

		const shiftStartTimeHour = shift.startTime.split(':')[0];
		const shiftStartTimeMinute = shift.startTime.split(':')[1];
		const shiftStartTime = parseInt(shiftStartTimeHour + shiftStartTimeMinute);

		const shiftEndTimeHour = shift.endTime.split(':')[0];
		const shiftEndTimeMinute = shift.endTime.split(':')[1];
		const shiftEndTime = parseInt(shiftEndTimeHour + shiftEndTimeMinute);

		for (let j = 0; j < matchedDay.length; j++) {
			const matchedShiftStartHour = matchedDay[j].startTime.split(':')[0];
			const matchedShiftStartMinute = matchedDay[j].startTime.split(':')[1];
			const matchedShiftStartTime = parseInt(matchedShiftStartHour + matchedShiftStartMinute);

			const matchedShiftEndHour = matchedDay[j].endTime.split(':')[0];
			const matchedShiftEndMinute = matchedDay[j].endTime.split(':')[1];
			const matchedShiftEndTime = parseInt(matchedShiftEndHour + matchedShiftEndMinute);

			if (
				slotValidity(shiftStartTime, matchedShiftStartTime, matchedShiftEndTime) ||
				slotValidity(shiftEndTime, matchedShiftStartTime, matchedShiftEndTime)
			) {
				return res.status(403).json(errorResponse('Employee slot overlaps with an existing shift'));
			}
		}

		// If no valid slot is found, update the assigned employees array
		const assignee = await Shift.findByIdAndUpdate(
			{ _id: id },
			{
				$addToSet: { assignedEmployees: employeeId },
			},
			{ new: true }
		);

		res.status(200).json(successResponse(assignee, 'Assigned successfully'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const RemoveShiftFromEmployee = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { employeeId }: AssignEmployeeDto = req.body;

		const removedShift = await Shift.findByIdAndUpdate(
			{ _id: id },
			{
				$pull: { assignedEmployees: employeeId },
			},
			{ new: true }
		);

		res.status(200).json(successResponse(removedShift, 'Removed successfully'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

const slotValidity = (number: number, start: number, end: number): boolean => {
	return number >= start && number <= end;
};
