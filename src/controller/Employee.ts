import { Request, Response } from "express";
import "dotenv/config";
import { EmployeeUpdateDTO } from "../lib/dto/Employee.dto";
import { Employee } from "../lib/model/Employee";
import { successResponse } from "../lib/service/SuccessResponse";
import { errorResponse } from "../lib/service/ErrorResponse";

export const UpdateEmployee = async (req: Request, res: Response) => {
  try {    
    const id = req.params.id
    const data: EmployeeUpdateDTO = req.body

    const updatedUser = await Employee.findByIdAndUpdate({_id: id}, {
      $set: data
    }, { new: true })
    res.status(200).json(successResponse(updatedUser, 'Profile updated successful'))

  } catch (error) {
    res.status(500).json(errorResponse(error.message || "Internal server error"));
  }
}

export const DeleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    // Check and deleting if the employee exists
    const deletedEmployee = await Employee.findOneAndDelete({_id: id})
    if (!deletedEmployee) {
      return res.status(404).json(errorResponse("Employee not found"));
    }
    res.status(200).json(successResponse(deletedEmployee, "Employee deleted successful"));
  } catch (error) {
    res.status(500).json(errorResponse(error.message || "Internal server error"));
  }
}