const mongoose = require("mongoose");
const { Schema } = mongoose;
import { Gender } from "../enum/Gender.enum";
import { CommonModel } from "./Common";

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { name: "employee-name-idx", unique: false },
  },
  email: {
    type: String,
    unique: true,
    index: { name: "employee-email-idx", unique: true },
  },
  phone: {
    type: String,
    unique: true,
    index: { name: "employee-phone-idx", unique: true },
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    default: Gender.Unknown,
  },
});

export const Employee = CommonModel.discriminator(
  "Employee",
  employeeSchema,
  "employee"
);

module.exports = { Employee };
