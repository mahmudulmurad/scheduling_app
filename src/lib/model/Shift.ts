const mongoose = require("mongoose");
const { Schema } = mongoose;

const shiftSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { name: "shift-name-idx", unique: true },
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  assignedEmployees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  }],
},
{
  timestamps: true,
});

export const Shift = mongoose.model("Shift", shiftSchema);

module.exports = { Shift };
