import { Request, Response } from "express";
import { ShiftDTO, ShiftUpdateDTO } from "../lib/dto/Shift.dto";
import { Shift } from "../lib/model/Shift";
import { successResponse } from "../lib/service/SuccessResponse";
import { errorResponse } from "../lib/service/ErrorResponse";
import AuthRequest from "../lib/decorator/request";


export const Create = async (req: Request, res: Response) => {
    try {
        const data: ShiftDTO = req.body
        const newShift = new Shift(data);
        await newShift.save();

        res.status(201).json(successResponse(newShift, "Shift created"));

    } catch (error) {
        res.status(500).json(errorResponse(error.message || "Internal server error"));
    }
}

export const Update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data: ShiftUpdateDTO = req.body
        const updatedShift = await Shift.findByIdAndUpdate({ _id: id }, {
            $set: data
        }, { new: true })

        res.status(200).json(successResponse(updatedShift, "Shift Updated"));

    } catch (error) {
        res.status(500).json(errorResponse(error.message || "Internal server error"));
    }
}

export const Delete = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        // Check and deleting if the shift exists
        const deletedShift = await Shift.findOneAndDelete({ _id: id })
        if (!deletedShift) {
            return res.status(404).json(errorResponse("Shift not found"));
        }

        res.status(200).json(successResponse(deletedShift, "Shift deleted successful"));

    } catch (error) {
        res.status(500).json(errorResponse(error.message || "Internal server error"));
    }
}

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

        res.status(200).json(successResponse(shifts, "Shifts fetched successful"));

    } catch (error) {
        res.status(500).json(errorResponse(error.message || "Internal server error"));
    }
};

export const SingleShift = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const shift = await Shift.findOne({ _id: id });

        res.status(200).json(successResponse(shift, "Shift fetched successful"));

    } catch (error) {
        res.status(500).json(errorResponse(error.message || "Internal server error"));
    }
};

export const EmployeeShift = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.user.id
        const shifts = await Shift.find({ assignedEmployees: { $in: [id] } }).populate({
            path: 'assignedEmployees',
            select: '_id name email phone gender isActive role',
        });
        res.status(200).json(successResponse(shifts, "Shift fetched successful"));

    } catch (error) {
        res.status(500).json(errorResponse(error.message || "Internal server error"));
    }
};