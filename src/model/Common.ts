const mongoose = require("mongoose");
const { Schema } = mongoose;
import { ActiveStatus } from "../enum/Active.enum";
import { Roles } from "../enum/Role.enum";

export const commonSchema = new Schema(
  {
    version: {
      type: Number,
      default: 1,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.EMPLOYEE,
    },
    isActive: {
      type: String,
      enum: Object.values(ActiveStatus),
      default: ActiveStatus.enabled,
    },
    createdBy: {
      type: String,
      default: null,
    },
    updatedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const CommonModel = mongoose.model("CommonModel", commonSchema);

module.exports = { commonSchema, CommonModel };
