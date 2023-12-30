import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { EmployeeCreateDTO, EmployeeLoginDTO } from '../lib/dto/Employee.dto';
import { Employee } from '../lib/model/Employee';
import { errorResponse } from '../lib/service/ErrorResponse';
import { successResponse } from '../lib/service/SuccessResponse';

export const SignUp = async (req: Request, res: Response) => {
	try {
		const { email, password, name, phone, gender, role }: EmployeeCreateDTO = req.body;

		const existingEmployee = await Employee.findOne({ email });
		if (existingEmployee) {
			return res.status(400).json(errorResponse('User already exists with this email'));
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new employee
		const newEmployee = new Employee({
			email,
			name,
			phone,
			gender,
			role,
			password: hashedPassword,
		});
		await newEmployee.save();

		res.status(201).json(successResponse(newEmployee, 'Sign up successful'));
	} catch (error) {
		res.status(500).json(errorResponse(error.message || 'Internal server error'));
	}
};

export const Login = async (req: Request, res: Response) => {
	try {
		const { email, password }: EmployeeLoginDTO = req.body;

		// Find by email
		const employee = await Employee.findOne({ email });
		if (!employee) {
			return res.status(401).json(errorResponse('Invalid credentials'));
		}

		const passwordMatch = await bcrypt.compare(password, employee.password);
		if (!passwordMatch) {
			return res.status(401).json(errorResponse('Invalid credentials'));
		}
		const secret: string = process.env.SECRET!;

		// Generate JWT token
		const token = jwt.sign({ id: employee._id, role: employee.role }, secret, {
			expiresIn: '10h',
		});

		res.status(200).json(successResponse(employee, 'Login successful', token));
	} catch (error) {
		res.status(500).json(errorResponse('Internal server error'));
	}
};
