const mongoose = require("mongoose");
const { Schema } = mongoose;
import { Gender } from "../enum/Gender.enum";
import { ActiveStatus } from "../enum/Active.enum";
import { Roles } from "../enum/Role.enum";

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
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.EMPLOYEE,
    index: { name: "employee-role-idx", unique: false },
  },
  isActive: {
    type: String,
    enum: Object.values(ActiveStatus),
    default: ActiveStatus.enabled,
    index: { name: "employee-isActive-idx", unique: false },
  }
},
{
  timestamps: true,
});

export const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee };
