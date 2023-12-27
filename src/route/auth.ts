import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Employee } from "../model/Employee";
import { EmployeeCreateDTO, EmployeeLoginDTO } from "../dto/Employee.dto";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, gender }: EmployeeCreateDTO =
      req.body;

    // Check if the username already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Employee already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const newEmployee = new Employee({
      email,
      name,
      phone,
      gender,
      password: hashedPassword,
    });
    await newEmployee.save();

    res.status(201).json({ message: "Sign up successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password }: EmployeeLoginDTO = req.body;

    // Find by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const secret: string = process.env.SECRET!;

    // Generate JWT token
    const token = jwt.sign({ userId: employee._id }, secret, {
      expiresIn: "10h",
    });

    res.json({ token, type: employee.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
